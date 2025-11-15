// Función para enviar notificaciones desde la consola del navegador
// Copia y pega este código en la consola del navegador (F12)

async function enviarNotificacion(datos) {
  // Configuración
  const API_BASE = 'https://feria-pabellon-server.onrender.com/api';
  const admin_user = 'tu_usuario_admin'; // CAMBIAR por tu usuario
  const admin_password = 'tu_password_admin'; // CAMBIAR por tu password
  
  // Crear credenciales básicas
  const credentials = btoa(`${admin_user}:${admin_password}`);
  
  // Datos por defecto
  const payload = {
    title: datos.title || '🎪 Feria de Pabellón',
    body: datos.body || 'Nueva notificación de la feria',
    icon: datos.icon || '/icon-192x192.png',
    url: datos.url || '/',
    data: datos.data || {}
  };
  
  try {
    const response = await fetch(`${API_BASE}/push/broadcast`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Notificación enviada exitosamente:', result);
      return result;
    } else {
      console.error('❌ Error enviando notificación:', result);
      return { error: result };
    }
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    return { error: error.message };
  }
}

// === EJEMPLOS DE USO ===

// Notificación básica
enviarNotificacion({
  title: '🎭 Teatro del Pueblo',
  body: 'Presentación especial esta noche a las 8:00 PM'
});

// Notificación de evento
enviarNotificacion({
  title: '⚽ Torneo de Fútbol',
  body: 'Final del campeonato en la Feria Deportiva',
  url: '/feriadeportiva',
  data: { evento: 'futbol', hora: '18:00' }
});

// Notificación para niños
enviarNotificacion({
  title: '🎪 Zona Peques',
  body: 'Nuevos juegos y actividades para los más pequeños',
  url: '/zonapeques'
});

// Notificación de comida
enviarNotificacion({
  title: '🍴 Festival Gastronómico',
  body: 'Prueba los deliciosos platillos regionales',
  url: '/'
});

console.log(`
🚀 Funciones cargadas exitosamente!

Para enviar una notificación, usa:
enviarNotificacion({
  title: 'Tu título aquí',
  body: 'Tu mensaje aquí',
  url: '/ruta-opcional'
});

⚠️ IMPORTANTE: Cambia las credenciales admin_user y admin_password por las correctas
`);