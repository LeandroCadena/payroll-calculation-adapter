import type { CalculationRecord, CalculationStatus } from './calculation-status.types';

const calculations = new Map<string, CalculationRecord>();
const calculationsByIdempotencyKey = new Map<string, string>();

export const createCalculationRecord = (
  calculationGroupId: string,
  idempotencyKey: string,
): CalculationRecord => {
  const now = new Date();

  const record: CalculationRecord = {
    calculationGroupId,
    idempotencyKey,
    status: 'CALCULATING',
    createdAt: now,
    updatedAt: now,
  };

  calculations.set(calculationGroupId, record);
  calculationsByIdempotencyKey.set(idempotencyKey, calculationGroupId);

  return record;
};

export const findCalculationByIdempotencyKey = (
  idempotencyKey: string,
): CalculationRecord | undefined => {
  const calculationGroupId = calculationsByIdempotencyKey.get(idempotencyKey);

  if (!calculationGroupId) {
    return undefined;
  }

  return calculations.get(calculationGroupId);
};

export const updateCalculationStatus = (
  calculationGroupId: string,
  status: CalculationStatus,
  errorMessage?: string,
): CalculationRecord | undefined => {
  const existingRecord = calculations.get(calculationGroupId);

  if (!existingRecord) {
    return undefined;
  }

  const updatedRecord: CalculationRecord = {
    ...existingRecord,
    status,
    errorMessage,
    updatedAt: new Date(),
  };

  calculations.set(calculationGroupId, updatedRecord);

  return updatedRecord;
};

export const findCalculationRecord = (
  calculationGroupId: string,
): CalculationRecord | undefined => {
  return calculations.get(calculationGroupId);
};
