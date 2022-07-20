import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import colors from 'colors';
import connectDB from './db/database.js';
import Users from './routes/userRoutes.js';
import Auth from './routes/authRoutes.js';
import Subscribers from './routes/subscriberRoutes.js';
import Images from './routes/imageRoutes.js';
dotenv.config();
const app = express();
const { PORT } = process.env;

// Database
connectDB();
// Middleware
app.use(express.json({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/users', Users);
app.use('/api/auth', Auth);
app.use('/api/subscriber', Subscribers);
app.use('/api/images', Images);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, (err) => {
  if (err) console.log(`Error: ${err}`.red.bold);
  console.log(`Server is running on port: ${PORT}`.bold.brightYellow);
});
