import { ApplicationError } from './application-error';

export class ExternalServiceError extends ApplicationError {
  constructor(serviceName: string, message = `External service ${serviceName} failed`) {
    super(message, 502, 'EXTERNAL_SERVICE_ERROR');
    this.name = 'ExternalServiceError';
  }
}
