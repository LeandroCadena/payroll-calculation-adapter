import type { CalculationResult } from './calculation-results.types';

// Simula una tabla de resultados.
// En una implementación real este repository persistiría los resultados
// en PostgreSQL, DynamoDB u otro motor de almacenamiento.
const calculationResults = new Map<string, CalculationResult[]>();

export const saveCalculationResults = (
  calculationGroupId: string,
  results: CalculationResult[],
): void => {
  calculationResults.set(calculationGroupId, results);
};

export const findCalculationResults = (calculationGroupId: string): CalculationResult[] => {
  return calculationResults.get(calculationGroupId) ?? [];
};
