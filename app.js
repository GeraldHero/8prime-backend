import express from 'express/index';
import mongoose from 'mongoose';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import dotenv from 'dotenv';
import Users from './routes/userRoutes.js';
import Auth from './routes/authRoutes.js';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI_lOCAL_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log(`MongoDB connected to host ${conn.connection.host}`);
  } catch (error) {
    if (error) {
      console.log(error);
      process.exit(1);
    }
  }
};
connectDB();
const app = express();
app.use(express.json({ extended: true }));
app.use('/api/users', Users);
app.use('/api/auth', Auth);

app.use(notFound);
app.use(errorHandler);

export default app;
