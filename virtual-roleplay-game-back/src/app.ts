import express from "express";
import cors from 'cors';
import path from "path";
import bodyParser from 'body-parser';
import 'dotenv/config';

import { loadApiEndpoints } from "./controllers/api";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT ?? 3000);
// app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 }));
app.use(cors());

loadApiEndpoints(app);

export default app;