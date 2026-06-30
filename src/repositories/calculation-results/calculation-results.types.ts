export interface CalculationResult {
  calculationGroupId: string;
  associateOID: string;
  grossAmount: number;
  taxAmount: number;
  netAmount: number;
  currencyCode: string;
}
