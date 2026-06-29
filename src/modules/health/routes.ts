import { Router } from 'express';

import { getHealth, getLive, getReady } from './controller';

export const healthRoutes = Router();

healthRoutes.get('/health', getHealth);
healthRoutes.get('/health/live', getLive);
healthRoutes.get('/health/ready', getReady);