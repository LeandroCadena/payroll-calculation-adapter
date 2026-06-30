export interface LogContext {
  correlationId: string;
  calculationGroupId: string;
  requesterAOID?: string;
}

// Centralizamos metadata común de logs.
// Esto evita estructuras inconsistentes entre distintos pasos del pipeline.
export const createLogContext = (context: LogContext): LogContext => {
  return context;
};
