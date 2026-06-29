import { randomUUID } from 'node:crypto';

// El Correlation ID identifica un flujo completo de procesamiento.
// Todos los servicios involucrados deberían reutilizar este mismo valor
// para facilitar el troubleshooting y la observabilidad.
export const createCorrelationId = (): string => {
  return randomUUID();
};
