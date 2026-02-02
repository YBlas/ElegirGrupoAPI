"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.connectMongoDB = void 0;
const mongodb_1 = require("mongodb");
let client = null;
let db = null;
const dbName = "Vicio";
const connectMongoDB = async () => {
    if (db)
        return db;
    const mongoUrl = `mongodb+srv://${process.env.USER_MONGO}:${process.env.USER_PASSWORD}@${process.env.MONGO_CLUSTER}.3ta2r.mongodb.net/?appName=${process.env.MONGO_APP_NAME}`;
    try {
        if (!client) {
            client = new mongodb_1.MongoClient(mongoUrl);
        }
        await client.connect();
        db = client.db(dbName);
        console.log("Connected to mongodb at db " + dbName);
        return db;
    }
    catch (error) {
        console.error("Error mongo:", error);
        throw error;
    }
};
exports.connectMongoDB = connectMongoDB;
const getDb = () => {
    if (!db) {
        throw new Error("Database not initialized. Call connectMongoDB first.");
    }
    return db;
};
exports.getDb = getDb;
