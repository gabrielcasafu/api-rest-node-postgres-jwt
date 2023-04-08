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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const postgres_1 = require("../database/postgres");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield postgres_1.pool.query('SELECT * FROM users ORDER BY id ASC');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server error' });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const response = yield postgres_1.pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (response.rowCount == 0)
            return res.status(404).json({
                message: 'Usuario no encontrado.'
            });
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server error' });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname, email, password, codigosector, isactive, createdat } = req.body;
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
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { name, lastname, email, password, codigosector, isactive, createdat } = req.body;
    // hash contraseña
    const salt = yield bcrypt_1.default.genSalt(10);
    const clave = yield bcrypt_1.default.hash(password, salt);
    try {
        const response = yield postgres_1.pool.query('UPDATE users SET name = $1, lastname = $2, email = $3, password = $4, codigosector = $5, isactive = $6, createdat = $7 WHERE id = $8', [
            name,
            lastname,
            email,
            clave,
            codigosector,
            isactive,
            createdat,
            id
        ]);
        if (response.rowCount == 0)
            return res.status(404).json({
                message: 'Usuario no encontrado.'
            });
        //console.log(response)
        const data = yield postgres_1.pool.query('SELECT * FROM users WHERE id=$1', [id]);
        console.log(data.rows);
        //return res.status(200).json(data.rows);
        return res.status(200).json({
            message: 'Usuario actualizado exitosamente!',
            body: {
                user: {
                    id,
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
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const response = yield postgres_1.pool.query('DELETE FROM users where id = $1', [
            id
        ]);
        if (response.rowCount == 0)
            return res.status(404).json({
                message: 'Usuario no encontrado.'
            });
        return res.status(200).json({ message: 'Usuario eliminado exitosamente!' });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server error' });
    }
});
exports.deleteUser = deleteUser;
