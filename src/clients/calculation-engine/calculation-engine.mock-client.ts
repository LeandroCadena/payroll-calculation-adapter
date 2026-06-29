import type {
  CalculationEngineRequest,
  CalculationEngineResponse,
} from './calculation-engine.types';

// Este mock simula el calculation-engine real.
// Más adelante podrá reemplazarse por un client HTTP o por otro repo independiente.
export const calculatePayroll = async (
  request: CalculationEngineRequest,
  accessToken: string,
): Promise<CalculationEngineResponse> => {
  void accessToken;

  return {
    calculationGroupId: request.calculationGroupId,
    results: request.associates.map((associate) => {
      const grossAmount = associate.standardHours * associate.baseRateAmount;
      const taxAmount = grossAmount * 0.22;

      return {
        associateOID: associate.associateOID,
        grossAmount,
        taxAmount,
        netAmount: grossAmount - taxAmount,
        currencyCode: associate.currencyCode,
      };
    }),
  };
};
