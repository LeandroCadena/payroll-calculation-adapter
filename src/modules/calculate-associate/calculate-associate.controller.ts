import type { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';

import type {
  CalculateAssociateAcceptedResponseDto,
  CalculateAssociateRequestDto,
} from './calculate-associate.dto';

// Controllers deben permanecer livianos.
// Su responsabilidad es traducir HTTP hacia la capa de aplicación y devolver una respuesta.
export const calculateAssociate = async (
  req: Request<unknown, unknown, CalculateAssociateRequestDto>,
  res: Response<CalculateAssociateAcceptedResponseDto>,
): Promise<void> => {
  const calculationGroupId = randomUUID();

  res.status(202).json({
    calculationGroupId,
    status: 'CALCULATING',
    message: 'Calculation request accepted and is being processed asynchronously',
  });
};
