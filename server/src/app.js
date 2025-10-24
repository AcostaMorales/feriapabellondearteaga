import express from 'express';
import cors from 'cors';
import {corsOptions} from './config/corsOption.js';
import {connectDB} from './config/db.js';
import temporizadorRoute from './routes/temporizadorRoute.js';
import notificationRoute from './routes/notificationRoute.js';

const app = express();
connectDB();

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/temporizador', temporizadorRoute);
app.use('/api/notifications', notificationRoute);

export default app;