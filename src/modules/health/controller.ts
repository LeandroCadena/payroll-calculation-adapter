import type { Request, Response } from 'express';

import { getHealthStatus, getLivenessStatus, getReadinessStatus } from './service';

export const getHealth = (_req: Request, res: Response): void => {
  res.status(200).json(getHealthStatus());
};

export const getLive = (_req: Request, res: Response): void => {
  res.status(200).json(getLivenessStatus());
};

export const getReady = (_req: Request, res: Response): void => {
  res.status(200).json(getReadinessStatus());
};
