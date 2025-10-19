import express from 'express';
import cors from 'cors';
import {corsOptions} from './config/corsOptions.js';
import {connectDB} from './config/db.js';

const app = express();
connectDB();

app.use(cors(corsOptions));
app.use(express.json());

export default app;