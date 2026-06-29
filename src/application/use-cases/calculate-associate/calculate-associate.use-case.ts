import { randomUUID } from 'node:crypto';

import { fetchPayrollBuilderData } from '@/clients/payroll-builder';
import { dispatchBackgroundTask } from '@/infrastructure/background';
import { logger } from '@/infrastructure/logger';
import { getValidOAuthToken } from '@/modules/oauth';
import { createCalculationRecord, updateCalculationStatus } from '@/repositories/calculations';

import type {
  CalculateAssociateAcceptedResponseDto,
  CalculateAssociateRequestDto,
} from '@/modules/calculate-associate/calculate-associate.dto';

export const executeCalculateAssociateUseCase = (
  request: CalculateAssociateRequestDto,
): CalculateAssociateAcceptedResponseDto => {
  const calculationGroupId = randomUUID();

  createCalculationRecord(calculationGroupId);

  dispatchBackgroundTask(async () => {
    logger.info(
      {
        calculationGroupId,
        requesterAOID: request.requesterAOID,
        associateCount: request.calculateAssociate.length,
      },
      'Calculate associate background process started',
    );

    const token = await getValidOAuthToken();

    const payrollBuilderResponse = await fetchPayrollBuilderData(
      {
        requesterAOID: request.requesterAOID,
        associateOIDs: request.calculateAssociate.map((item) => item.associateOID),
      },
      token.accessToken,
    );

    logger.info(
      {
        calculationGroupId,
        associateCount: payrollBuilderResponse.associates.length,
      },
      'Payroll builder data received',
    );

    updateCalculationStatus(calculationGroupId, 'CALCULATED');

    logger.info(
      {
        calculationGroupId,
      },
      'Calculate associate background process completed',
    );
  });

  return {
    calculationGroupId,
    status: 'CALCULATING',
    message: 'Calculation request accepted and is being processed asynchronously',
  };
};
