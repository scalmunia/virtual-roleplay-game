import { MongoClient } from 'mongodb';

// Connection URL
const url = process.env.CONNECTION_MONGODB;
const client = new MongoClient(url);

console.log(process.env.CONNECTION_MONGODB);

// Database Name
const dbName = 'db';

export default async function mongodb() {
  // Use connect method to connect to the server
  await client.connect();
  const db = client.db(dbName);
  
  return db;
}