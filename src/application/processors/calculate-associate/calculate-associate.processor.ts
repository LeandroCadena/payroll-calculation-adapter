import { mapPayrollBuilderAssociatesToCalculationEngineInput } from '@/application/mappers/calculation-engine.mapper';
import { calculatePayroll } from '@/clients/calculation-engine';
import { fetchPayrollBuilderData } from '@/clients/payroll-builder';
import { validatePayrollBuilderAssociates } from '@/domain/payroll/payroll-business-validation';
import { logger } from '@/infrastructure/logger';
import { getValidOAuthToken } from '@/modules/oauth';
import { updateCalculationStatus } from '@/repositories/calculations';

import type { CalculateAssociateRequestDto } from '@/modules/calculate-associate/calculate-associate.dto';

// El processor representa el trabajo que podría ejecutar un worker real.
// Esto permite mover el procesamiento a SQS, BullMQ o Lambda sin cambiar el controller.
export const processCalculateAssociate = async (
  calculationGroupId: string,
  request: CalculateAssociateRequestDto,
): Promise<void> => {
  logger.info(
    {
      calculationGroupId,
      requesterAOID: request.requesterAOID,
      associateCount: request.calculateAssociate.length,
    },
    'Calculate associate background process started',
  );

  const payrollBuilderToken = await getValidOAuthToken();

  const payrollBuilderResponse = await fetchPayrollBuilderData(
    {
      requesterAOID: request.requesterAOID,
      associateOIDs: request.calculateAssociate.map((item) => item.associateOID),
    },
    payrollBuilderToken.accessToken,
  );

  logger.info(
    {
      calculationGroupId,
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
      calculationGroupId,
      associateCount: calculationEngineInput.length,
    },
    'Payroll builder data mapped to calculation engine input',
  );

  const calculationEngineToken = await getValidOAuthToken();

  const calculationEngineResponse = await calculatePayroll(
    {
      calculationGroupId,
      associates: calculationEngineInput,
    },
    calculationEngineToken.accessToken,
  );

  logger.info(
    {
      calculationGroupId,
      resultCount: calculationEngineResponse.results.length,
    },
    'Calculation engine completed payroll calculation',
  );

  updateCalculationStatus(calculationGroupId, 'CALCULATED');

  logger.info(
    {
      calculationGroupId,
    },
    'Calculate associate background process completed',
  );
};
