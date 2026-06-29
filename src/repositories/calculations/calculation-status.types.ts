export type CalculationStatus = 'CALCULATING' | 'CALCULATED' | 'ERROR';

export interface CalculationRecord {
  calculationGroupId: string;
  idempotencyKey: string;
  correlationId: string;
  status: CalculationStatus;
  createdAt: Date;
  updatedAt: Date;
  errorMessage?: string;
}
