"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpect = exports.options = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
// Metadata info about our api
exports.options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node Postgres API",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:3001",
                description: "Development server"
            },
        ],
    },
    apis: ["./src/routes/*.ts"]
};
// Docs en JSON format
exports.swaggerSpect = (0, swagger_jsdoc_1.default)(exports.options);
