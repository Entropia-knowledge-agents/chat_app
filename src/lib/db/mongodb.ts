import { MongoClient, MongoClientOptions } from "mongodb";

// Asegúrate de que la URI de MongoDB está definida
if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env");
}

const uri: string = process.env.MONGODB_URI as string;
const options: MongoClientOptions = {
  connectTimeoutMS: 10000, // 10 segundos
  socketTimeoutMS: 45000, // 45 segundos
  serverSelectionTimeoutMS: 45000, // 45 segundos
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Extender el tipo global para incluir _mongoClientPromise
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  // En modo desarrollo, se usa una variable global para que el cliente
  // no se recree en cada recarga del módulo
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise!;
} else {
  // En producción, es mejor no usar una variable global
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Función para cerrar la conexión
export async function closeConnection(): Promise<void> {
  const client = await clientPromise;
  await client.close();
}

// Manejo básico de errores de conexión
clientPromise.catch((error) => {
  console.error("Failed to connect to MongoDB", error);
  process.exit(1);
});

export default clientPromise;