"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const config_js_1 = require("../config.js");
exports.pool = new pg_1.Pool({
    user: config_js_1.DB_USER,
    host: config_js_1.DB_HOST,
    password: config_js_1.DB_PASSWORD,
    database: config_js_1.DB_DATABASE,
    port: 5432
});
