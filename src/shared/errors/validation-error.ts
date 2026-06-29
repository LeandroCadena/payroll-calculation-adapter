import { ApplicationError } from './application-error';

export interface ValidationIssue {
  path: string;
  message: string;
}

// ValidationError representa errores esperados de datos externos.
// Separarlo de ApplicationError permite devolver detalles útiles sin exponer errores internos.
export class ValidationError extends ApplicationError {
  constructor(public readonly issues: ValidationIssue[]) {
    super('Invalid request payload', 400, 'VALIDATION_ERROR');
  }
}
