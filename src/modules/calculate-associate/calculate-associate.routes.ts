import { Router } from 'express';

import { asyncHandler } from '@/infrastructure/http';
import { validateRequest } from '@/infrastructure/middleware/validate-request.middleware';

import { calculateAssociate } from './calculate-associate.controller';
import { calculateAssociateSchema } from './calculate-associate.schema';

export const calculateAssociateRoutes = Router();

calculateAssociateRoutes.post(
  '/api/v1/calculate-associate',
  validateRequest(calculateAssociateSchema),
  asyncHandler(calculateAssociate),
);
