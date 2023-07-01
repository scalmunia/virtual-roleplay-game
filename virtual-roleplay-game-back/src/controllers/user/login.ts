import { Request, Response } from "express";
import mongodb from "../../clients/mongodb";

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).send({ error: 'Email no enviado' });
      return;
    }
  
    // Idem para el password
    if (!password) {
      res.status(400).send({ error: 'Contraseña no enviada' });
      return;
    }

    const db = await mongodb();
    const [user] = await db.collection('users').find({ email: email }).toArray();

    //TOKEN
    // const bodyEncryptedPassword = btoa(password);
    // const passwordNotMatch = bodyEncryptedPassword !== user?.encryptedPassword;

    // if (!user || passwordNotMatch) {
    if (!user || !password) {
      res.status(400).send({ error: 'Inicio de sesión no válido' });
      return;
    }
    
    // const token = btoa(`${user.email}/${new Date().toISOString()}`);
    // res.send({ email: user.email, token });

    res.status(200).send({ email: user.email });
  } catch(error) {
    res.status(500).send(error);
  }
}