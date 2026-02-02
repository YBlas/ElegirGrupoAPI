"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongo_1 = require("./mongo");
dotenv_1.default.config();
// IMPORTANT: run once, reused by serverless
(0, mongo_1.connectMongoDB)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", routes_1.default);
exports.default = app;
