import { Application, Request, Response } from "express";
// import mongodb from "../../clients/mongodb.js";

export async function getCharactersController(req: Request, res: Response) {
  
  res.send({ message: 'GET CHARACTER FUNCIONA' });
}