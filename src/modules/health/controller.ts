import type { Request, Response } from 'express';

import { getHealthStatus } from './service';

export const getHealth = (_req: Request, res: Response): void => {
  res.status(200).json(getHealthStatus());
};

export const getLive = (_req: Request, res: Response): void => {
  res.status(200).json({
    status: 'alive',
  });
};

export const getReady = (_req: Request, res: Response): void => {
  res.status(200).json({
    status: 'ready',
  });
};
