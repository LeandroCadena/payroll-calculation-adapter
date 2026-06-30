import { Router } from 'express';

import { asyncHandler } from '@/infrastructure/http';

import {
  getCalculationResults,
  type GetCalculationResultsParams,
} from './get-calculation-results.controller';

export const calculationResultsRoutes = Router();

calculationResultsRoutes.get(
  '/api/v1/calculations/:calculationGroupId/results',
  asyncHandler<GetCalculationResultsParams>(getCalculationResults),
);
