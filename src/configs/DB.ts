import mongoose from 'mongoose';
import { DB_URL } from '../constants/server.constants';

export default function connectDB() {
  return new Promise((resolve, reject) => {
    mongoose.set('strictQuery', false);
    mongoose
      .connect(DB_URL)

      .then(() => {
        resolve('Successfully connected to database');
      })
      .catch((error) => {
        reject(error);
      });
  });
}
