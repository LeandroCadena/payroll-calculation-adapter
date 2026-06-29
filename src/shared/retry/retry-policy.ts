import { logger } from '@/infrastructure/logger';

export interface RetryOptions {
  attempts: number;
  delayMs: number;
}

const sleep = (delayMs: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
};

// Retry Policy permite reintentar operaciones transitorias.
// Es común en integraciones externas donde pueden existir timeouts o errores temporales.
export const executeWithRetry = async <T>(
  operationName: string,
  operation: () => Promise<T>,
  options: RetryOptions,
): Promise<T> => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= options.attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      logger.warn(
        {
          operationName,
          attempt,
          maxAttempts: options.attempts,
          error,
        },
        'Retryable operation failed',
      );

      if (attempt < options.attempts) {
        await sleep(options.delayMs * attempt);
      }
    }
  }

  throw lastError;
};
