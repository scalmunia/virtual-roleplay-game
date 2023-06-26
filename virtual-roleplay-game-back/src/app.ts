import express from "express";
import path from "path";
import { MongoClient } from "mongodb";
import 'dotenv/config';

import { loadApiEndpoints } from "./controllers/api";

// Create Express server
const app = express();

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Express configuration
app.set("port", process.env.PORT ?? 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 }));

loadApiEndpoints(app);

console.log(process.env.CONNECTION_MONGODB);

export default app;

