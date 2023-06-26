import { Application, Request, Response } from "express";

import CoursesData from "../../data/courses.json";

export const loadApiEndpoints = (app: Application): void => {
	//endpoint de prueba
	app.get("/api", (req: Request, res: Response) => {
		console.log('funcionaaaaa');
		return res.status(200).send(CoursesData);
	});
};
