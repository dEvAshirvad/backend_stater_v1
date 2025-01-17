import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import cors from 'cors';
import { allowedOrigins } from '@/constants/server.constants';
import UserDeserializer from '@/middlewares/UserDeserializer';
import router from '@/modules';
import compression from 'compression';
import Respond from '@/lib/Respond';
import { errorHandler } from '@/middlewares/errorHandler';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

export default function serverConfig(app: Express) {
  app.use(compression());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true, limit: '2048mb' }));
  app.use(express.json({ limit: '2048mb' }));
  app.use(
    cors({
      credentials: true,
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    })
  );
  app.use(helmet());
  app.use(limiter);
  app.use(UserDeserializer);

  app.get('/', (_, res) => {
    Respond(res, { message: 'API services are nominal!!' }, 200);
  });
  app.use('/api/v1', router);

  app.use(errorHandler);
}
