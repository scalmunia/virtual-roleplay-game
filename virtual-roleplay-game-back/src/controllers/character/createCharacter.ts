import { Request, Response } from "express";
import mongodb from "../../clients/mongodb";

export async function createCharacterController(req: Request, res: Response) {
  console.log(req.body);

  const { name, level, characterClass, abilities } = req.body;

  const db = await mongodb();

  res.status(200).send({ message: 'CREATE CHARACTER FUNCIONA' });
}