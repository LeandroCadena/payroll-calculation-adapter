export type CalculationStatus = 'CALCULATING' | 'CALCULATED' | 'ERROR';

export interface CalculationRecord {
  calculationGroupId: string;
  idempotencyKey: string;
  status: CalculationStatus;
  createdAt: Date;
  updatedAt: Date;
  errorMessage?: string;
}
