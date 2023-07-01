import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import mongodb from "../../clients/mongodb";

export async function deleteCharacterController(req: Request, res: Response) {
  try {
    //Obtener id del parámetro de ruta
    const _id = new ObjectId(req.params.id);
  
    //Inicializar la conexión con mongodb
    const db = await mongodb();
    const result = await db.collection('characters').deleteMany({ _id});
  
    // res.status(200).send({ result });
    res.status(200).send({ message: `Usuario con id ${req.params.id} borrado` });
  } catch(error) {
    res.status(500).send(error);
  }
}