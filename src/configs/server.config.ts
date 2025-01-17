import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import cors from 'cors';
import { allowedOrigins } from '@/constants/server.constants';
import Respond from '@/lib/Respond';
import { errorHandler } from '@/middlewares/errorHandler';
import UserDeserializer from '@/middlewares/UserDeserializer';
import router from '@/modules';
import helmet from 'helmet';

export default function serverConfig(app: Express) {
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
  app.use(UserDeserializer);

  app.get('/', (_, res) => {
    Respond(res, { message: 'API services are nominal!!' }, 200);
  });
  app.use('/api/v1', router);

  app.use(errorHandler);
}
