import Temporizador from "../models/Temporizador.js";

export const getTemporizador = async (req, res) => {
    const temporizador = await Temporizador.findOne();
    if (!temporizador) {
        return res.status(404).json({ message: 'No se encontró el temporizador' });
    }
    res.json(temporizador);
};

export const createTemporizador = async (req, res) => {
    const { fechaLimite, imagen } = req.body;
    const nuevoTemporizador = new Temporizador({ fechaLimite, imagen });
    await nuevoTemporizador.save();
    res.status(201).json(nuevoTemporizador);
};

export const updateTemporizador = async (req, res) => {
    const { id } = req.params;
    const { fechaLimite, imagen } = req.body;
    const temporizadorActualizado = await Temporizador.findByIdAndUpdate(id, { fechaLimite, imagen }, { new: true });
    if (!temporizadorActualizado) {
        return res.status(404).json({ message: 'No se encontró el temporizador' });
    }   
    res.json(temporizadorActualizado);
};