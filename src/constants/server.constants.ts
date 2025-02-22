import { config } from 'dotenv';
config();

const PORT = process.env.PORT || 3030;
const HOST = process.env.HOST || 'localhost';
const PROTOCOL = HOST === 'localhost' ? 'http' : 'https';
const DB_URL = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_INITDB_ROOT_DATABASE}?authSource=admin`;
const allowedOrigins = ['http://localhost:3000'];

const SERVER_URL = `${PROTOCOL}://${HOST}${HOST === 'localhost' ? `:${PORT}` : ``}`;
const COOKIE_DOMAIN = HOST === 'localhost' ? 'localhost' : `.${HOST}`;

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || 'root';

export {
  PORT,
  HOST,
  PROTOCOL,
  SERVER_URL,
  DB_URL,
  COOKIE_DOMAIN,
  allowedOrigins,
  JWT_SECRET,
  JWT_EXPIRATION,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
};
