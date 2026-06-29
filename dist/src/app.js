"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./bootstrap/middlewares");
// App centraliza la creación de Express.
// Esto permite testear la aplicación sin levantar el servidor HTTP real.
const createApp = () => {
    const app = (0, express_1.default)();
    (0, middlewares_1.registerMiddlewares)(app);
    return app;
};
exports.createApp = createApp;
