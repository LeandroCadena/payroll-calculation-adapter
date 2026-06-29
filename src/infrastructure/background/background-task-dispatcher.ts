import { logger } from '@/infrastructure/logger';

export type BackgroundTask = () => Promise<void>;

// Este dispatcher desacopla el caso de uso del mecanismo real de ejecución async.
// Hoy ejecuta tareas en memoria, pero mañana puede reemplazarse por SQS, BullMQ o EventBridge.
export const dispatchBackgroundTask = (task: BackgroundTask): void => {
  setImmediate(() => {
    task().catch((error) => {
      logger.error(
        {
          error,
        },
        'Background task failed',
      );
    });
  });
};
