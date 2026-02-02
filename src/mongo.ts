import { Db, MongoClient } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

const dbName = "Vicio";

export const connectMongoDB = async (): Promise<Db> => {
  if (db) return db;

  const mongoUrl = `mongodb+srv://${process.env.USER_MONGO}:${process.env.USER_PASSWORD}@${process.env.MONGO_CLUSTER}.3ta2r.mongodb.net/?appName=${process.env.MONGO_APP_NAME}`;

  try {
    if (!client) {
      client = new MongoClient(mongoUrl);
    }
    await client.connect();

    db = client.db(dbName);
    console.log("Connected to mongodb at db " + dbName);

    return db;
  } catch (error) {
    console.error("Error mongo:", error);
    throw error;
  }
};

export const getDb = async (): Promise<Db> => {
  if (!db) {
    await connectMongoDB();
  }
  return db!;
};
