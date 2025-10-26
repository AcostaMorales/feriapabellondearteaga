import express from 'express';
import cors from 'cors';
<<<<<<< HEAD
import {corsOptions} from './config/corsOption.js';
import {connectDB} from './config/db.js';
import temporizadorRoute from './routes/temporizadorRoute.js';
import notificationRoute from './routes/notificationRoute.js';
=======
import cookieParser from 'cookie-parser';

import routes from './routes/index.js';
import {corsOptions } from './config/corsOption.js';
>>>>>>> b04c185 (intento de notificacion v1)

const app = express();

// Middlewares base
app.use(cors(corsOptions));
//app.use('*', cors(corsOptions)); // para preflight requests
app.use(express.json({limit: '1mb'}));
app.use(cookieParser());

<<<<<<< HEAD
// Routes
app.use('/api/temporizador', temporizadorRoute);
app.use('/api/notifications', notificationRoute);

export default app;
=======
// Prefijo de rutas /api
app.use('/api', routes);

export default app;
>>>>>>> b04c185 (intento de notificacion v1)
