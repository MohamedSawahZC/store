"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.PORT);
const { PORT, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_DB_TEST, POSTGRES_USER, POSTGRES_PASSWORD, NODE_ENV, SECRET_KEY, SALT_ROUND, SECRET_TOKEN, } = process.env;
exports.default = {
    port: PORT,
    host: POSTGRES_HOST,
    dbPORT: POSTGRES_PORT,
    database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    secret_key: SECRET_KEY,
    salt_round: SALT_ROUND,
    secret_token: SECRET_TOKEN,
};
