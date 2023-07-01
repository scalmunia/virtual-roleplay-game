import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import mongodb from "../../clients/mongodb";

export async function getCharacterController(req: Request, res: Response) {

  // res.send({ message: 'FUNCIONA' });

  try {
    //Obtener id del parámetro de ruta
    const _id = new ObjectId(req.params.id);
    
    //Inicializar la conexión con mongodb
    const db = await mongodb();
    
    const [ result ] = await db.collection('characters').find({ _id }).toArray(); // Hay que desestructurar para sacar el primer valor del array (si no se hace habría un array con un elemento)
  
    res.status(200).send({ result });
  } catch(error) {
    res.status(500).send(error);
  }
}