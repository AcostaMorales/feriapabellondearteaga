import mongoose from 'mongoose';

const temporizadorSchema = new mongoose.Schema({
    fechaLimite: { type: Date, required: true },
    imagen: {type: String, required: true },
}, {
    collection: 'temporizadors' // Mantiene el nombre que ya existe en MongoDB
});

export default mongoose.model('Temporizador', temporizadorSchema);