import { MongoClient } from 'mongodb';

// Connection URL
const url: any = process.env.CONNECTION_MONGODB;

if (!url) {
  throw 'Cadena de conexión a MongoDB no se ha encontrado'
}

const client = new MongoClient(url);

console.log(process.env.CONNECTION_MONGODB);

// Database Name
const dbName = 'RoleplayDB';

export default async function mongodb() {
  // Use connect method to connect to the server
  await client.connect();
  const db = client.db(dbName);
  
  return db;
}