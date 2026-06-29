import type { Request, Response } from 'express';

import { getValidOAuthToken } from './oauth-token.service';

export const getOAuthToken = async (_req: Request, res: Response): Promise<void> => {
  const token = await getValidOAuthToken();

  res.status(200).json({
    accessToken: token.accessToken,
    tokenType: token.tokenType,
    expiresAt: token.expiresAt.toISOString(),
  });
};
