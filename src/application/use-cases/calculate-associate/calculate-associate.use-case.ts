import { randomUUID } from 'node:crypto';

import { processCalculateAssociate } from '@/application/processors/calculate-associate';
import { dispatchBackgroundTask } from '@/infrastructure/background';
import {
  createCalculationRecord,
  findCalculationByIdempotencyKey,
} from '@/repositories/calculations';
import { createCalculateAssociateIdempotencyKey } from '@/shared/idempotency';

import type {
  CalculateAssociateAcceptedResponseDto,
  CalculateAssociateRequestDto,
} from '@/modules/calculate-associate/calculate-associate.dto';

export const executeCalculateAssociateUseCase = (
  request: CalculateAssociateRequestDto,
): CalculateAssociateAcceptedResponseDto => {
  const idempotencyKey = createCalculateAssociateIdempotencyKey(request);
  const existingCalculation = findCalculationByIdempotencyKey(idempotencyKey);

  if (existingCalculation) {
    return {
      calculationGroupId: existingCalculation.calculationGroupId,
      status: existingCalculation.status,
      message: 'Calculation request already exists',
    };
  }

  const calculationGroupId = randomUUID();

  createCalculationRecord(calculationGroupId, idempotencyKey);

  dispatchBackgroundTask(async () => {
    await processCalculateAssociate(calculationGroupId, request);
  });

  return {
    calculationGroupId,
    status: 'CALCULATING',
    message: 'Calculation request accepted and is being processed asynchronously',
  };
};
