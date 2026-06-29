import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';

export interface RequestContext {
  traceId: string;
}

// AsyncLocalStorage mantiene datos asociados a una request async.
// Esto evita pasar traceId manualmente por todos los services.
const requestContextStorage = new AsyncLocalStorage<RequestContext>();

export const runWithRequestContext = <T>(callback: () => T): T => {
  return requestContextStorage.run(
    {
      traceId: randomUUID(),
    },
    callback,
  );
};

export const getRequestContext = (): RequestContext | undefined => {
  return requestContextStorage.getStore();
};
