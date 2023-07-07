import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authGuard(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.header('Authorization');

    // Comprobar que hay cabecera con el token
    if (!authorization) throw 'Falta cabecera Authorization con el token';

    // Sacar solo el token
    const token = authorization.replace('Bearer ', '');
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
      if (err) {
        throw 'Acceso denegado, token expirado o incorrecto';
      } else {
        // req.user = user;
        next();
      }
    });
    
  } catch (error) {    
    res.status(401).send({ error });
    return;
  }
};