import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

// middleware to validate token (rutas protegidas)
const verifyToken = async (req:any, res:any, next:any)  => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ message: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, TOKEN_SECRET)
        req.user = verified
        next()
    } catch (error) {
        return res.status(400).json({ message: 'token no es válido' })
    }
}

export default verifyToken