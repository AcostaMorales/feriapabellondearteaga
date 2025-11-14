// middlewares/adminAuth.js
import { Buffer } from 'buffer';

const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    // Solicitar autenticación básica
    res.setHeader('WWW-Authenticate', 'Basic realm="Panel de Administración"');
    return res.status(401).json({ 
      message: 'Autenticación requerida para acceder al panel de administración' 
    });
  }

  try {
    // Decodificar credenciales
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    // Verificar credenciales contra variables de entorno
    const adminUser = process.env.ADMIN_USER;
    const adminPassword = process.env.ADMIN_PASS || process.env.ADMIN_PASSWORD;

    if (!adminUser || !adminPassword) {
      console.error('❌ ADMIN_USER o ADMIN_PASSWORD no están configurados en .env');
      return res.status(500).json({ 
        message: 'Error de configuración del servidor' 
      });
    }

    if (username !== adminUser || password !== adminPassword) {
      console.log(`⚠️ Intento de acceso fallido: ${username}`);
      res.setHeader('WWW-Authenticate', 'Basic realm="Panel de Administración"');
      return res.status(401).json({ 
        message: 'Credenciales incorrectas' 
      });
    }

    console.log(`✅ Acceso autorizado al panel de administración: ${username}`);
    next();

  } catch (error) {
    console.error('❌ Error en autenticación:', error);
    return res.status(400).json({ 
      message: 'Error al procesar credenciales' 
    });
  }
};

export default adminAuth;