import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import cors from 'cors';
import { allowedOrigins } from '@/constants/server.constants';

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
}
