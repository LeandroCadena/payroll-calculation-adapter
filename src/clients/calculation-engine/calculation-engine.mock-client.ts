import { ExternalServiceError } from '@/shared/errors';

import type {
  CalculationEngineRequest,
  CalculationEngineResponse,
} from './calculation-engine.types';

export const calculatePayroll = async (
  request: CalculationEngineRequest,
  accessToken: string,
): Promise<CalculationEngineResponse> => {
  if (!accessToken) {
    throw new ExternalServiceError('calculation-engine', 'Missing OAuth access token');
  }

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
