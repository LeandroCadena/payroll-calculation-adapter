import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';

export interface RequestContext {
  requestId: string;
  traceId: string;
  startedAt: Date;
}

// AsyncLocalStorage mantiene datos asociados a una request async.
// Esto evita pasar requestId o traceId manualmente por todos los services.
const requestContextStorage = new AsyncLocalStorage<RequestContext>();

export const runWithRequestContext = <T>(callback: () => T): T => {
  return requestContextStorage.run(
    {
      requestId: randomUUID(),
      traceId: randomUUID(),
      startedAt: new Date(),
    },
    callback,
  );
};

export const getRequestContext = (): RequestContext | undefined => {
  return requestContextStorage.getStore();
};
