"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMiddlewares = void 0;
const express_1 = __importDefault(require("express"));
// Los middlewares globales se registran en un solo lugar.
// Esto evita que app.ts crezca demasiado cuando el proyecto empieza a escalar.
const registerMiddlewares = (app) => {
    app.use(express_1.default.json());
};
exports.registerMiddlewares = registerMiddlewares;
