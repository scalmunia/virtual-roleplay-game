import { MongoClient } from 'mongodb';

// Conexión URL
const url: any = process.env.CONNECTION_MONGODB;

if (!url) {
  throw 'Cadena de conexión a MongoDB no se ha encontrado'
}

const client = new MongoClient(url);

console.log(process.env.CONNECTION_MONGODB);

// Nombre de Database 
const dbName = 'RoleplayDB';

export default async function mongodb() {
  // Establecer la conexión al servidor
  await client.connect();
  const db = client.db(dbName);

  return db;
}