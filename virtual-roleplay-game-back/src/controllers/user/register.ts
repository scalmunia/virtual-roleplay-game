import { Request, Response } from "express";
import mongodb from "../../clients/mongodb";

export async function registerController(req: Request, res: Response) {
  try {
    const { email, password, ...rest } = req.body;
    
    if (!email) {
      res.status(400).send({ error: 'Email no enviado' });
      return;
    }
    
    if (!password) {
      res.status(400).send({ error: 'Contraseña no enviada' });
      return;
    }
    
    // const encryptedPassword = btoa(password); //METER TOKEN
    
    const db = await mongodb();
    
    const user = {
      email,
      password,
      // encryptedPassword,
      ...rest
    };
    
    const result = await db.collection('users').insertOne(user);
    
    res.status(200).send({ result });
  } catch(error) {
    res.status(500).send(error);
  }
}