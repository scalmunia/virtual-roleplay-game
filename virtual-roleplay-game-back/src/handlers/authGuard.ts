import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authGuard(req: Request, res: Response, next: any) {
  try {
    const authorization = req.header('Authorization');

    // Comprobar que hay cabecera con el token
    if (!authorization) throw 'Falta cabecera Authorization con el token';

    // Sacar solo el token
    const token = authorization.replace('Bearer ', '');
    console.log(token);
    const SECRET_KEY = process.env.SECRET_KEY as string;
    console.log(SECRET_KEY);
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        throw 'Acceso denegado, token expirado o incorrecto';
      } else {
        console.log('TODO OK');
        // req.user = user;
        next();
      }
    });
    
  } catch (error) {    
    res.status(401).send({ error });
    return;
  }
};