import mongoose from 'mongoose';

const temporizadorSchema = new mongoose.Schema({
    fechaLimite: { type: Date, required: true },
    imagen: {type: String, required: true },
});

export default mongoose.model('Temporizador', temporizadorSchema);