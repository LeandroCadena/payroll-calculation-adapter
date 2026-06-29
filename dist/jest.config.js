'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
// Jest se usa para ejecutar pruebas unitarias e integración.
// En proyectos backend, esto ayuda a validar lógica de negocio sin depender del entorno real.
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
};
exports.default = config;
