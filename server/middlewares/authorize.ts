import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { config } from '../config/config';


const secret = config.jwt.secret

export const createToken = ( payload: object ) => {
    return jwt.sign(payload, secret, {expiresIn: '7d' })
}

export const verifyToken = ( token: string, secret: string ): { isValid: boolean; content: jwt.JwtPayload } => {
    try {
        return {
            isValid: true,
            content: jwt.verify(token, secret) as jwt.JwtPayload,
        }
    } catch (error) {
        return {
            isValid: false,
            content: {},
        }
    }
}

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    const parsedToken = token?.replace('Bearer ', '') || ''
    const result = verifyToken(parsedToken, secret)

    if (!token || !result.isValid) {
        res.status(401)
        throw new Error('Unathorized access')
    }

    next() 
}