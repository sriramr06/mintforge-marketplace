import { envSchema } from './env';
import mongoose from 'mongoose';

const MONGO_URI = envSchema.MONGO_URI;

export const connectDB = async (): Promise<void> => {
  try{
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error('MongoDB Connection Error: ', error);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error: ', error);
});