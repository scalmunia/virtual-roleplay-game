import { Request, Response } from "express";
import mongodb from "../../clients/mongodb";
import jwt from "jsonwebtoken";

export async function getCharactersController(req: Request, res: Response) {
  try {
    //Obtener el token de la cabecera
    const authorization = req.header('Authorization');

    // Comprobar que hay cabecera con el token
    if (!authorization) throw 'Falta cabecera Authorization con el token';

    // Sacar solo el token
    const token = authorization.replace('Bearer ', '');
    
    //Sacar el id a partir del token
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY) as { userId: string };
    const userId = decodedToken.userId;

    //Inicializar la conexión con mongodb
    const db = await mongodb(); 

    const result = await db.collection('characters').find({ idUser: userId }).toArray(); 
   
    res.status(200).send({ result });
  } catch(error) {
    res.status(500).send(error);
  }
}