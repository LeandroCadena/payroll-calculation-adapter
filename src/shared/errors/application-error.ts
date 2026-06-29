// ApplicationError será la clase base para errores controlados de la aplicación.
// Esto permite diferenciar errores esperados de errores inesperados del sistema.
export class ApplicationError extends Error {
  constructor(
    message: string,
    public readonly statusCode = 500,
    public readonly code = 'INTERNAL_SERVER_ERROR',
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}
