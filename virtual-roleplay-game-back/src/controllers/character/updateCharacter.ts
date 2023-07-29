import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import mongodb from "../../clients/mongodb";
import jwt from "jsonwebtoken";

export async function updateCharacterController(req: Request, res: Response) {
  try {
    //Obtener id del parámetro de ruta
    const _id = new ObjectId(req.params.id);
    const body = req.body;

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

    //Comprobar si el usuario tiene un idCharacter asociado
    const userCharacter = await db.collection('user_character').findOne({ userId, characterId: req.params.id });
    if (!userCharacter) {
      res.send(403);
      return;
    }

    await db.collection('characters').updateOne({ _id }, { $set: body });

    res.status(200).send({ message: `Usuario con id ${req.params.id} actualizado` });
  } catch (error) {
    res.status(500).send(error);
  }
}