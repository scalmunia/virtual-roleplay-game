import { Application, Request, Response } from "express";

import { loginController } from './user/login';
import { registerController } from './user/register';
import { getUserController } from './user/getUser';
import { getCharactersController } from './characters/getCharacters';
import { getCharacterController } from './character/getCharacter';
import { createCharacterController } from './character/createCharacter';
import { updateCharacterController } from './character/updateCharacter';
import { deleteCharacterController } from './character/deleteCharacter';
import { uploadsFilesController } from './assets/uploads';
import multer from 'multer';

import { logger } from '../handlers/logger';
import { authGuard } from '../handlers/authGuard';
import { getHealth } from "./vitals/health";

export const loadApiEndpoints = (app: Application): void => {
	// Routes
	app.get('/api/health', logger, getHealth);

	app.get('/api', logger, (req: Request, res: Response) => { res.send({ message: 'node-mongo-api works!' }); });
	app.post('/api/user/register', logger, registerController);
	app.post('/api/user/login', logger, loginController);
	app.get('/api/user', logger, authGuard, getUserController);

	app.get('/api/characters', logger, authGuard, getCharactersController);

	app.post('/api/character', logger, authGuard, createCharacterController);
	app.get('/api/character/:id', logger, authGuard, getCharacterController);
	app.put('/api/character/:id', logger, authGuard, updateCharacterController);
	app.delete('/api/character/:id', logger, authGuard, deleteCharacterController);

	//Multer es un middleware de node.js para el manejo multipart/form-data, que se utiliza principalmente para cargar archivos
	app.post('/api/assets/uploads', logger, authGuard, multer().single('file'), uploadsFilesController);
};
