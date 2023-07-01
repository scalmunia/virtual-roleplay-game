import { Request, Response } from "express";
import mongodb from "../../clients/mongodb";

export async function createCharacterController(req: Request, res: Response) {
  try {
    console.log(req.body);
  
    //Desestructurar de lo que llega del body
    const { idUser, name, ...rest } = req.body;
  
    //Inicializar la conexión con mongodb
    const db = await mongodb();

    //Crear personaje
    const character = {
      idUser,
      name,      
      ...rest
    }
    const result = await db.collection('characters').insertOne(character);
  
    res.status(200).send({ result });
  } catch(error) {
    res.status(500).send(error);
  }
}