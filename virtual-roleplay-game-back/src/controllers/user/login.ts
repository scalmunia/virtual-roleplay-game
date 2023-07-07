import { Request, Response } from "express";
import mongodb from "../../clients/mongodb";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
// import fs from 'fs';

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password);

    if (!email) {
      res.status(400).send({ error: 'Email no enviado' });
      return;
    }
  
    if (!password) {
      res.status(400).send({ error: 'Contraseña no enviada' });
      return;
    }

    const db = await mongodb();

    // const userByEmail = await db.collection('users').findOne({ email: { $eq: email } });
    const [user] = await db.collection('users').find({ email: email }).toArray();        
    if (!user || !hashPassword) {
      res.status(400).send({ error: 'Inicio de sesión no válido' });
      return;
    }
    
    //Generar el token
    const userId = user?._id;
    const expiresIn = 24 * 60 * 60;
    const payload = {
      userId: userId
    };    
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
    // const privateKey = fs.readFileSync(JWT_SECRET_KEY);
    const accessToken = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: expiresIn});
    res.status(200).send({
      message: 'Usuario autenticado',
      token: accessToken
    });

    // res.status(200).send({ email: user.email, accessToken });
  } catch(error) {
    res.status(500).send(error);
  }
}