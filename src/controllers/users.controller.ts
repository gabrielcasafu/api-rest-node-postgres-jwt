import { Request, Response } from 'express';
import bcrypt  from 'bcrypt'
import { pool } from '../database/postgres';
import { QueryResult } from 'pg';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await
            pool.query('SELECT * FROM users ORDER BY id ASC');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server error'});
    }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try {
        const response: QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (response.rowCount == 0) return res.status(404).json({
            message: 'Usuario no encontrado.'
        })
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server error'});
    }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const { name, lastname, email, password, codigosector, isactive, createdat } = req.body;

    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    const clave = await bcrypt.hash(password, salt);

    try{
        const response: QueryResult = await pool.query('UPDATE users SET name = $1, lastname = $2, email = $3, password = $4, codigosector = $5, isactive = $6, createdat = $7 WHERE id = $8', [
        name, 
        lastname, 
        email, 
        clave, 
        codigosector, 
        isactive, 
        createdat,
        id
    ]);
        if (response.rowCount == 0) return res.status(404).json({
            message: 'Usuario no encontrado.'
        })

        const data: QueryResult = await pool.query('SELECT * FROM users WHERE id=$1', [id]);

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
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server error'});
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try{
        const response: QueryResult = await pool.query('DELETE FROM users where id = $1', [
            id
        ]);
        if (response.rowCount == 0) return res.status(404).json({
            message: 'Usuario no encontrado.'
        })
        return res.status(200).json({ message: 'Usuario eliminado exitosamente!'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server error'});
    }
};