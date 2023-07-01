import { Request, Response } from "express";
import mongodb from "../../clients/mongodb";

export async function getCharactersController(req: Request, res: Response) {
  try {
    //Inicializar la conexión con mongodb
    const db = await mongodb(); 

    const result = await db.collection('characters').find({}).toArray(); 

    res.status(200).send({ result });
  } catch(error) {
    res.status(500).send(error);
  }
}