import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';

import dbConnect from './configs/db.config';

import AuthRoutes from './routes/auth.routes';
import UserRoutes from './routes/user.routes';
import PostRoutes from './routes/post.routes';

const app = express();

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', AuthRoutes);
app.use('/api/user', UserRoutes);
app.use('/api/post', PostRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
