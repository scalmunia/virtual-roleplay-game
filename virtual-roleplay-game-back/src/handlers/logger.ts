import { Application, Request, Response } from "express";

export function logger(req: Request, res: Response, next: any) {
  console.log(req.method, req.path)
  next();
};