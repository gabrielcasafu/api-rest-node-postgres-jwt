import { Request, Response } from 'express';
import bcrypt  from 'bcrypt'
import jwt from 'jsonwebtoken'
import { pool } from '../database/postgres';
import { QueryResult } from 'pg';
import { TOKEN_SECRET } from '../config.js'

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    try {
        //Verificar si existe usuario
        const response: QueryResult = await 
            pool.query('SELECT * FROM users WHERE email=$1', [username]);
        if (response.rowCount === 0) {
            return res.status(400).json({
                message: 'Usuario no encontrado'
            })}

        const validPassword = await bcrypt.compare(password, response.rows[0].password);
        if (!validPassword) return res.status(400).json({ message: 'Contraseña no válida' })
        
        // create token
        const token = jwt.sign({
            id: response.rows[0].id,
            username: response.rows[0].email,
            password: response.rows[0].password
        }, TOKEN_SECRET, {
            expiresIn: 3600, // 1 hour
        })
        return res.status(200).json({error: null, data: {token}});
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server error'});
    }
};


export const registerUser = async (req: Request, res: Response): Promise<Response> => {
    const { name, lastname, email, password, codigosector, isactive, createdat } = req.body;

    //validar si existe email
    const responseEmail: QueryResult = await
            pool.query('SELECT * FROM users WHERE email=$1', [email]);

    if (responseEmail.rowCount === 1) {
        return res.status(400).json({message: 'Email ya registrado'
    })}

    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    const clave = await bcrypt.hash(password, salt);

    try {
        
        const response: QueryResult = await pool.query('INSERT INTO users (name, lastname, email, password, codigosector, isactive, createdat) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
            name, 
            lastname, 
            email, 
            clave, 
            codigosector, 
            isactive, 
            createdat
        ]);
        return res.status(200).json(
            {
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
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server error'});
    }
    
};