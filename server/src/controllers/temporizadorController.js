import Temporizador from "../models/Temporizador.js";

export const getTemporizador = async (req, res) => {
    try {
        console.log('🔍 Buscando temporizador en la base de datos...');
        
        // Primero verificamos cuántos documentos hay
        const count = await Temporizador.countDocuments();
        console.log(`📊 Total de temporizadores en DB: ${count}`);
        
        // Buscar el temporizador más reciente
        const temporizador = await Temporizador.findOne().sort({ _id: -1 });
        
        if (!temporizador) {
            console.log('❌ No se encontró ningún temporizador');
            return res.status(404).json({ 
                message: 'No se encontró el temporizador',
                debug: {
                    totalDocuments: count
                }
            });
        }
        
        console.log('✅ Temporizador encontrado:', temporizador);
        res.json(temporizador);
    } catch (error) {
        console.error('❌ Error al obtener temporizador:', error);
        res.status(500).json({ 
            message: 'Error del servidor al obtener temporizador',
            error: error.message 
        });
    }
};

export const createTemporizador = async (req, res) => {
    try {
        console.log('📝 Creando nuevo temporizador...');
        console.log('📦 Datos recibidos:', req.body);
        
        const { fechaLimite, imagen } = req.body;
        
        // Validar que se proporcionen los datos necesarios
        if (!fechaLimite) {
            return res.status(400).json({ 
                message: 'La fecha límite es requerida' 
            });
        }
        
        const nuevoTemporizador = new Temporizador({ fechaLimite, imagen });
        const temporizadorGuardado = await nuevoTemporizador.save();
        
        console.log('✅ Temporizador creado exitosamente:', temporizadorGuardado);
        res.status(201).json(temporizadorGuardado);
    } catch (error) {
        console.error('❌ Error al crear temporizador:', error);
        res.status(500).json({ 
            message: 'Error del servidor al crear temporizador',
            error: error.message 
        });
    }
};

export const updateTemporizador = async (req, res) => {
    try {
        console.log('🔄 Actualizando temporizador...');
        console.log('🆔 ID:', req.params.id);
        console.log('📦 Datos recibidos:', req.body);
        
        const { id } = req.params;
        const { fechaLimite, imagen } = req.body;
        
        const temporizadorActualizado = await Temporizador.findByIdAndUpdate(
            id, 
            { fechaLimite, imagen }, 
            { new: true }
        );
        
        if (!temporizadorActualizado) {
            console.log('❌ No se encontró el temporizador con ID:', id);
            return res.status(404).json({ 
                message: 'No se encontró el temporizador con el ID proporcionado' 
            });
        }
        
        console.log('✅ Temporizador actualizado exitosamente:', temporizadorActualizado);
        res.json(temporizadorActualizado);
    } catch (error) {
        console.error('❌ Error al actualizar temporizador:', error);
        res.status(500).json({ 
            message: 'Error del servidor al actualizar temporizador',
            error: error.message 
        });
    }
};