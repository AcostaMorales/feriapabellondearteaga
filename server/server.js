import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import  connectDB  from './src/config/db.js';
import temporizadorRoute from './src/routes/temporizadorRoute.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors(process.env.CORS_OPTIONS ));
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use('/temporizador', temporizadorRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});