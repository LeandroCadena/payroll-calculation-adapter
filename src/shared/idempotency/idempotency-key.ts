import { createHash } from 'node:crypto';

import type { CalculateAssociateRequestDto } from '@/modules/calculate-associate/calculate-associate.dto';

// La idempotencia evita procesar dos veces la misma operación lógica.
// Generamos una key estable basada en los campos principales de la request.
export const createCalculateAssociateIdempotencyKey = (
  request: CalculateAssociateRequestDto,
): string => {
  const payload = JSON.stringify({
    requesterAOID: request.requesterAOID,
    associates: request.calculateAssociate.map((item) => ({
      associateOID: item.associateOID,
      organizationOID: item.organizationOID,
      payPeriodID: item.payPeriodID,
      payDate: item.payDate,
    })),
  });

  return createHash('sha256').update(payload).digest('hex');
};
