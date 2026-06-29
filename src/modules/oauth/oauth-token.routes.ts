import { Router } from 'express';

import { asyncHandler } from '@/infrastructure/http';

import { getOAuthToken } from './oauth-token.controller';

export const oauthTokenRoutes = Router();

oauthTokenRoutes.post('/oauth/token', asyncHandler(getOAuthToken));
