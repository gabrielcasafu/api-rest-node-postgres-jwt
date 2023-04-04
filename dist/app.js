"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api/v1/', users_routes_1.default);
app.use('/api/v1/api-doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpect));
//En caso de solicitar una url que no este definida
app.use((req, res, next) => {
    res.status(404).json({
        message: 'url not found'
    });
});
exports.default = app;
