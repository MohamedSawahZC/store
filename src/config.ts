import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.PORT);

const {
  PORT,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  NODE_ENV,
  SECRET_KEY,
  SALT_ROUND,
} = process.env;
export default {
  port: PORT,
  host: POSTGRES_HOST,
  dbPORT: POSTGRES_PORT,
  database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  secret_key: SECRET_KEY,
  salt_round: SALT_ROUND,
};
