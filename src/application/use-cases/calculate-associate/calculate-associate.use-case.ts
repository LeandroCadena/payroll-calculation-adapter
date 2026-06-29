import { randomUUID } from 'node:crypto';

import { processCalculateAssociate } from '@/application/processors/calculate-associate';
import { dispatchBackgroundTask } from '@/infrastructure/background';
import { createCalculationRecord } from '@/repositories/calculations';
import { createCalculateAssociateIdempotencyKey } from '@/shared/idempotency';

import type {
  CalculateAssociateAcceptedResponseDto,
  CalculateAssociateRequestDto,
} from '@/modules/calculate-associate/calculate-associate.dto';

export const executeCalculateAssociateUseCase = (
  request: CalculateAssociateRequestDto,
): CalculateAssociateAcceptedResponseDto => {
  const calculationGroupId = randomUUID();

  const idempotencyKey = createCalculateAssociateIdempotencyKey(request);

  createCalculationRecord(calculationGroupId);

  void idempotencyKey;

  dispatchBackgroundTask(async () => {
    await processCalculateAssociate(calculationGroupId, request);
  });

  return {
    calculationGroupId,
    status: 'CALCULATING',
    message: 'Calculation request accepted and is being processed asynchronously',
  };
};
