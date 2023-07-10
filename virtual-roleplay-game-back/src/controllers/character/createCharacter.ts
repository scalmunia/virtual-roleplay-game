import { Request, Response } from "express";
import mongodb from "../../clients/mongodb";
import jwt from "jsonwebtoken";

export async function createCharacterController(req: Request, res: Response) {
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
  
    //Desestructurar de lo que llega del body
    const { name, ...rest } = req.body;
  
    //Inicializar la conexión con mongodb
    const db = await mongodb();

    //Crear personaje
    const character = {
      name,      
      ...rest
    }
    const characterResult = await db.collection('characters').insertOne(character);
    const characterId = characterResult.insertedId.toString();
    
    //AÑADIR A NUEVA COLECCION IDUSER + IDCHARACTER
    const result = await db.collection('user_character').insertOne({userId, characterId});
    
    res.status(200).send({ code: '200', result });
  } catch(error) {
    res.status(500).send(error);
  }
}