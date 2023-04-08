"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const postgres_1 = require("../database/postgres");
const config_js_1 = require("../config.js");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        //Verificar si existe usuario
        const response = yield postgres_1.pool.query('SELECT * FROM users WHERE email=$1', [username]);
        if (response.rowCount === 0) {
            return res.status(400).json({
                message: 'Usuario no encontrado'
            });
        }
        const validPassword = yield bcrypt_1.default.compare(password, response.rows[0].password);
        if (!validPassword)
            return res.status(400).json({ message: 'Contraseña no válida' });
        // create token
        const token = jsonwebtoken_1.default.sign({
            id: response.rows[0].id,
            username: response.rows[0].email,
            password: response.rows[0].password
        }, config_js_1.TOKEN_SECRET, {
            expiresIn: 3600, // 1 hour
        });
        return res.status(200).json({ error: null, data: { token } });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server error' });
    }
});
exports.loginUser = loginUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname, email, password, codigosector, isactive, createdat } = req.body;
    //validar si existe email
    const responseEmail = yield postgres_1.pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (responseEmail.rowCount === 1) {
        return res.status(400).json({ message: 'Email ya registrado'
        });
    }
    // hash contraseña
    const salt = yield bcrypt_1.default.genSalt(10);
    const clave = yield bcrypt_1.default.hash(password, salt);
    try {
        const response = yield postgres_1.pool.query('INSERT INTO users (name, lastname, email, password, codigosector, isactive, createdat) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
            name,
            lastname,
            email,
            clave,
            codigosector,
            isactive,
            createdat
        ]);
        return res.status(200).json({
            message: 'Usuario agregado exitosamente!',
            body: {
                user: {
                    name,
                    lastname,
                    email,
                    password: clave,
                    codigosector,
                    isactive,
                    createdat
                }
            }
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server error' });
    }
});
exports.registerUser = registerUser;
