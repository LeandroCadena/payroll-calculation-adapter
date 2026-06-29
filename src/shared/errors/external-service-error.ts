import { ApplicationError } from './application-error';

export class ExternalServiceError extends ApplicationError {
  constructor(
    public readonly serviceName: string,
    message = `External service ${serviceName} failed`,
    public readonly retryable = true,
  ) {
    super(message, 502, 'EXTERNAL_SERVICE_ERROR');
    this.name = 'ExternalServiceError';
  }
}
