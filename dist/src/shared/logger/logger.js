"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const env_1 = require("../../config/env");
// Pino genera logs estructurados en formato JSON.
// Este formato facilita que plataformas como Splunk, Loki o CloudWatch
// puedan indexar y consultar los eventos de la aplicación.
exports.logger = (0, pino_1.default)({
    name: env_1.env.SERVICE_NAME,
    level: env_1.env.LOG_LEVEL,
    timestamp: pino_1.default.stdTimeFunctions.isoTime,
    base: {
        service: env_1.env.SERVICE_NAME,
    },
});
