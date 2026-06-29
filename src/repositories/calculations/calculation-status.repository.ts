import type { CalculationRecord, CalculationStatus } from './calculation-status.types';

const calculations = new Map<string, CalculationRecord>();

export const createCalculationRecord = (calculationGroupId: string): CalculationRecord => {
  const now = new Date();

  const record: CalculationRecord = {
    calculationGroupId,
    status: 'CALCULATING',
    createdAt: now,
    updatedAt: now,
  };

  calculations.set(calculationGroupId, record);

  return record;
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
