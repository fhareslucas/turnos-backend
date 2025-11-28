import dotenv from 'dotenv';
dotenv.config();

export default {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};