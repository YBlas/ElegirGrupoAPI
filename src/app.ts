import express from "express";
import routerPersonas from "./routes";
import dotenv from "dotenv";
import { connectMongoDB } from "./mongo";

dotenv.config();

// IMPORTANT: run once, reused by serverless
connectMongoDB();

const app = express();
app.use(express.json());
app.use("/", routerPersonas);

export default app;
