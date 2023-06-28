import { Application, Request, Response } from "express";
// import mongodb from "../../clients/mongodb.js";

export async function loginController(req: Request, res: Response) {
  
  res.send({ message: 'LOGIN FUNCIONA' });
}