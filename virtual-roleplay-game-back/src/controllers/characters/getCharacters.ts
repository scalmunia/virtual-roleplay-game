import { Request, Response } from "express";
import mongodb from "../../clients/mongodb";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

export async function getCharactersController(req: Request, res: Response) {
  try {
    //Obtener el token de la cabecera
    const authorization = req.header('Authorization') as string;

    // Sacar solo el token
    const token = authorization.replace('Bearer ', '');
    
    //Sacar el id a partir del token
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY) as { userId: string };
    const userId = decodedToken.userId;

    //Inicializar la conexión con mongodb
    const db = await mongodb(); 

    const info = await db.collection('user_character').find({ userId: userId }).toArray(); 

    if (!info) {
      res.send(204);
      return;
    }

    const characterIds = info.map((element) => new ObjectId(element.characterId));

    const result = await db
      .collection('characters')
      .find({ _id: { $in: characterIds } })
      .toArray();

    res.status(200).send({ result });
  } catch(error) {
    res.status(500).send(error);
  }
}