import type { Request, Response } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';

import { findCalculationRecord } from '@/repositories/calculations';
import { ApplicationError } from '@/shared/errors';

export interface GetCalculationStatusParams extends ParamsDictionary {
  calculationGroupId: string;
}

export const getCalculationStatus = async (
  req: Request<GetCalculationStatusParams>,
  res: Response,
): Promise<void> => {
  const { calculationGroupId } = req.params;

  const calculation = findCalculationRecord(calculationGroupId);

  if (!calculation) {
    throw new ApplicationError('Calculation not found', 404, 'CALCULATION_NOT_FOUND');
  }

  res.status(200).json({
    calculationGroupId: calculation.calculationGroupId,
    correlationId: calculation.correlationId,
    status: calculation.status,
    createdAt: calculation.createdAt.toISOString(),
    updatedAt: calculation.updatedAt.toISOString(),
    errorMessage: calculation.errorMessage,
  });
};
