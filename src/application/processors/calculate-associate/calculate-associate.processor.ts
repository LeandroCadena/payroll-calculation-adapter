import { mapPayrollBuilderAssociatesToCalculationEngineInput } from '@/application/mappers/calculation-engine.mapper';
import { calculatePayroll } from '@/clients/calculation-engine';
import { fetchPayrollBuilderData } from '@/clients/payroll-builder';
import { validatePayrollBuilderAssociates } from '@/domain/payroll/payroll-business-validation';
import { logger } from '@/infrastructure/logger';
import { getValidOAuthToken } from '@/modules/oauth';
import { updateCalculationStatus } from '@/repositories/calculations';
import { executeWithRetry } from '@/shared/retry';
import { saveCalculationResults } from '@/repositories/calculation-results';
import { measurePipelineStep, type PipelineStepMetric } from '@/application/metrics';
import { createLogContext } from '@/shared/logging';
import { env } from '@/config/env';
import {
  incrementCalculationsCompleted,
  incrementCalculationsFailed,
} from '@/infrastructure/metrics';

import type { CalculateAssociateRequestDto } from '@/modules/calculate-associate/calculate-associate.dto';

// El processor representa el trabajo que podría ejecutar un worker.
// Cualquier excepción debe capturarse aquí para actualizar correctamente
// el estado del proceso y evitar cálculos "colgados" en CALCULATING.
export const processCalculateAssociate = async (
  calculationGroupId: string,
  correlationId: string,
  request: CalculateAssociateRequestDto,
): Promise<void> => {
  try {
    const metrics: PipelineStepMetric[] = [];

    const logContext = createLogContext({
      correlationId,
      calculationGroupId,
      requesterAOID: request.requesterAOID,
    });

    logger.info(
      {
        ...logContext,
        associateCount: request.calculateAssociate.length,
      },
      'Calculate associate background process started',
    );

    const payrollBuilderToken = await getValidOAuthToken();

    const payrollBuilderResponse = await measurePipelineStep(
      'payroll-builder',
      () =>
        executeWithRetry(
          'payroll-builder.fetch-data',
          () =>
            fetchPayrollBuilderData(
              {
                requesterAOID: request.requesterAOID,
                associateOIDs: request.calculateAssociate.map((item) => item.associateOID),
                correlationId,
              },
              payrollBuilderToken.accessToken,
            ),
          {
            attempts: env.RETRY_ATTEMPTS,
            delayMs: env.RETRY_DELAY_MS,
          },
        ),
      metrics,
    );

    logger.info(
      {
        ...logContext,
        associateCount: payrollBuilderResponse.associates.length,
      },
      'Payroll builder data received',
    );

    validatePayrollBuilderAssociates(payrollBuilderResponse.associates);

    const calculationEngineInput = mapPayrollBuilderAssociatesToCalculationEngineInput(
      payrollBuilderResponse.associates,
    );

    logger.info(
      {
        ...logContext,
        associateCount: calculationEngineInput.length,
      },
      'Payroll builder data mapped',
    );

    // Revalidamos el token antes de otra integración externa.
    const calculationEngineToken = await getValidOAuthToken();

    const calculationEngineResponse = await measurePipelineStep(
      'calculation-engine',
      () =>
        executeWithRetry(
          'calculation-engine.calculate-payroll',
          () =>
            calculatePayroll(
              {
                calculationGroupId,
                correlationId,
                associates: calculationEngineInput,
              },
              calculationEngineToken.accessToken,
            ),
          {
            attempts: 3,
            delayMs: 500,
          },
        ),
      metrics,
    );

    logger.info(
      {
        ...logContext,
        resultCount: calculationEngineResponse.results.length,
      },
      'Calculation engine completed',
    );

    saveCalculationResults(
      calculationGroupId,
      calculationEngineResponse.results.map((result) => ({
        calculationGroupId,
        associateOID: result.associateOID,
        grossAmount: result.grossAmount,
        taxAmount: result.taxAmount,
        netAmount: result.netAmount,
        currencyCode: result.currencyCode,
      })),
    );

    updateCalculationStatus(calculationGroupId, 'CALCULATED');

    incrementCalculationsCompleted();

    logger.info(
      {
        ...logContext,
        metrics,
      },
      'Calculate associate pipeline metrics collected',
    );

    logger.info(
      {
        ...logContext,
      },
      'Calculation finished successfully',
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown processing error';

    updateCalculationStatus(calculationGroupId, 'ERROR', message);

    incrementCalculationsFailed();

    logger.error(
      {
        correlationId,
        calculationGroupId,
        error,
      },
      'Calculate associate process failed',
    );
  }
};
