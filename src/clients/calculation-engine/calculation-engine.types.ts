import type { CalculationEngineAssociateInput } from '@/application/mappers/calculation-engine.mapper';

export interface CalculationEngineRequest {
  calculationGroupId: string;
  correlationId: string;
  associates: CalculationEngineAssociateInput[];
}

export interface CalculationEngineAssociateResult {
  associateOID: string;
  grossAmount: number;
  taxAmount: number;
  netAmount: number;
  currencyCode: string;
}

export interface CalculationEngineResponse {
  calculationGroupId: string;
  results: CalculationEngineAssociateResult[];
}
