import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import errorHandler from './middlewares/error.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import healthRoutes from './routes/healthRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

import routes from './routes/index.js';
import {corsOptions} from './config/corsOption.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Mideddlewares
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors(corsOptions));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({limit: '1mb'}));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/health', healthRoutes);

// Rutas
app.use('/api', routes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Servidor de Pabellón de Arteaga funcionando',
    version: '1.0.0',
    adminPanel: '/api/admin',
    docs: {
      admin: 'GET /api/admin - Panel de administración (requiere autenticación)',
      scheduler: 'GET /api/scheduler/status - Estado del scheduler',
      notifications: 'GET /api/admin/notifications - Gestión de notificaciones'
    }
  });
});

export default app;