import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import mongodb from "../../clients/mongodb";
import jwt from "jsonwebtoken";

export async function getUserController(req: Request, res: Response) {
  try {
    //Obtener el token de la cabecera
    const authorization = req.header('Authorization') as string;

    // Sacar solo el token
    const token = authorization.replace('Bearer ', '');

    //Sacar el id a partir del token
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY) as { userId: string };
    const userId = decodedToken.userId;
    const objectIdUserId = new ObjectId(userId);

    //Inicializar la conexión con mongodb
    const db = await mongodb();

    //Comprobar si el usuario tiene un idCharacter asociado
    const result = await db.collection('users').findOne({ _id: objectIdUserId });
    if (!result) {
      res.send(204);
      return;
    }

    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send(error);
  }
}