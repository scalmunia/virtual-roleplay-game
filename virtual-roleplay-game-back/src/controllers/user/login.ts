import { Request, Response } from "express";
import mongodb from "../../clients/mongodb";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).send({ code: '400', error: 'Email no enviado' });
      return;
    }
  
    if (!password) {
      res.status(400).send({ code: '400', error: 'Contraseña no enviada' });
      return;
    }

    const db = await mongodb();

    // const userByEmail = await db.collection('users').findOne({ email: { $eq: email } });
    const [user] = await db.collection('users').find({ email: email }).toArray();        
    if (!user || !bcrypt.compareSync(password, user.hashPassword)) {
      res.status(400).send({ code: '400', error: 'Inicio de sesión no válido' });
      return;
    }
    
    //Generar el token
    const userId = user?._id;
    const expiresIn = 24 * 60 * 60;
    const payload = {
      userId: userId
    };    
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
    const accessToken = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: expiresIn});
    res.status(200).send({
      code: '200',
      message: 'Usuario autenticado',
      token: accessToken
    });

  } catch(error) {
    res.status(500).send(error);
  }
}