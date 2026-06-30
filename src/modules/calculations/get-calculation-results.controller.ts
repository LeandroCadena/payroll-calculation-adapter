import type { Request, Response } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';

import { findCalculationRecord } from '@/repositories/calculations';
import { findCalculationResults } from '@/repositories/calculation-results';
import { ApplicationError } from '@/shared/errors';

export interface GetCalculationResultsParams extends ParamsDictionary {
  calculationGroupId: string;
}

export const getCalculationResults = async (
  req: Request<GetCalculationResultsParams>,
  res: Response,
): Promise<void> => {
  const { calculationGroupId } = req.params;

  const calculation = findCalculationRecord(calculationGroupId);

  if (!calculation) {
    throw new ApplicationError('Calculation not found', 404, 'CALCULATION_NOT_FOUND');
  }

  if (calculation.status !== 'CALCULATED') {
    throw new ApplicationError(
      'Calculation results are not available yet',
      409,
      'CALCULATION_RESULTS_NOT_READY',
    );
  }

  const results = findCalculationResults(calculationGroupId);

  res.status(200).json({
    calculationGroupId,
    correlationId: calculation.correlationId,
    status: calculation.status,
    results,
  });
};
