import { Router } from 'express';

import { asyncHandler } from '@/infrastructure/http';

import {
  getCalculationStatus,
  type GetCalculationStatusParams,
} from './get-calculation-status.controller';

export const calculationStatusRoutes = Router();

calculationStatusRoutes.get(
  '/api/v1/calculations/:calculationGroupId',
  asyncHandler<GetCalculationStatusParams>(getCalculationStatus),
);
