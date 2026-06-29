import type { Request, Response } from 'express';

import { executeCalculateAssociateUseCase } from '@/application/use-cases/calculate-associate';

import type {
  CalculateAssociateAcceptedResponseDto,
  CalculateAssociateRequestDto,
} from './calculate-associate.dto';

export const calculateAssociate = async (
  req: Request<unknown, unknown, CalculateAssociateRequestDto>,
  res: Response<CalculateAssociateAcceptedResponseDto>,
): Promise<void> => {
  const response = executeCalculateAssociateUseCase(req.body);

  res.status(202).json(response);
};
