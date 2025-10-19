import express from 'express';
import { getTemporizador, createTemporizador, updateTemporizador } from '../controllers/temporizadorController.js';

const router = express.Router();

router.get('/', getTemporizador);
router.post('/', createTemporizador);
router.put('/:id', updateTemporizador);

export default router;