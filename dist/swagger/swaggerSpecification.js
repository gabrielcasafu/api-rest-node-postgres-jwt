"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpecification = void 0;
const path_1 = __importDefault(require("path"));
exports.swaggerSpecification = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node Postgres API",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:30001"
            }
        ],
        apis: [`${path_1.default.join(__dirname, "../routes/*.js")}`]
    }
};
