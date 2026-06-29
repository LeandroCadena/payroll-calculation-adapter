import { logger } from '@/infrastructure/logger';
import { ExternalServiceError } from '@/shared/errors';

export interface RetryOptions {
  attempts: number;
  delayMs: number;
}

const sleep = (delayMs: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
};

const isRetryableError = (error: unknown): boolean => {
  if (error instanceof ExternalServiceError) {
    return error.retryable;
  }

  return false;
};

// Retry Policy no debe reintentar cualquier error.
// Solo reintentamos errores externos marcados como retryable.
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

      if (!isRetryableError(error) || attempt === options.attempts) {
        throw error;
      }

      logger.warn(
        {
          operationName,
          attempt,
          maxAttempts: options.attempts,
          error,
        },
        'Retryable operation failed',
      );

      await sleep(options.delayMs * attempt);
    }
  }

  throw lastError;
};
