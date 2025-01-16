import express from 'express';
import serverConfig from '@/configs/server.config';
import { PORT, SERVER_URL } from '@/constants/server.constants';
import { errorlogger, fatalLogger, logger } from '@/configs/logger';
import connectDB from '@/configs/DB';

const app = express();
serverConfig(app);

connectDB()
  .then(() => {
    logger.info('Running Status', 'Database connected');
  })
  .catch((err) => {
    errorlogger.error('Database Connection Failed', err);
    process.exit();
  });

const server = app.listen(PORT, () => {
  logger.info('Running Status', `Server started on port ${SERVER_URL}`);
});

process.on('unhandledRejection', (err) => {
  fatalLogger.fatal('Unhandled rejection', err);
  server.close(() => process.exit(1));
});
