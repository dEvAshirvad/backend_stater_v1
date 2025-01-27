import Redis from 'ioredis';
import { errorlogger } from './logger';
import {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
} from '@/constants/server.constants';

const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
});

redis.on('error', (error) => {
  errorlogger.error(`Redis error: ${error.message}`);
  throw error;
});

export default redis;
