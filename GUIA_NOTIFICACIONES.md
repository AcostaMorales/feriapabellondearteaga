# Guía para Enviar Notificaciones - Feria Pabellón de Arteaga

## 🔐 Autenticación Required
Todas las funciones de envío requieren autenticación básica HTTP con credenciales de admin.

## 📡 1. Envío Masivo de Notificaciones (Broadcast)

### Endpoint: POST /api/push/broadcast

**URL**: `https://feria-pabellon-server.onrender.com/api/push/broadcast`

**Headers necesarios**:
```
Authorization: Basic [base64(admin_user:admin_password)]
Content-Type: application/json
```

**Body ejemplo**:
```json
{
  "title": "🎪 ¡Nueva Atracción en la Feria!",
  "body": "No te pierdas el espectáculo de fuegos artificiales esta noche a las 8:00 PM",
  "icon": "/icon-192x192.png",
  "url": "/teatrodelpueblo",
  "data": {
    "eventType": "show",
    "eventTime": "20:00",
    "location": "Teatro del Pueblo"
  }
}
```

### cURL Ejemplo:
```bash
curl -X POST https://feria-pabellon-server.onrender.com/api/push/broadcast \
  -H "Authorization: Basic $(echo -n 'admin_user:admin_password' | base64)" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "🎪 ¡Nueva Atracción!",
    "body": "Espectáculo de fuegos artificiales a las 8:00 PM",
    "icon": "/icon-192x192.png",
    "url": "/teatrodelpueblo"
  }'
```

## 📱 2. Envío a Dispositivo Específico

### Endpoint: POST /api/push/to-device

**Body ejemplo**:
```json
{
  "deviceId": "device_123",
  "payload": {
    "title": "🎯 Notificación Personal",
    "body": "Mensaje dirigido específicamente a ti",
    "icon": "/icon-192x192.png",
    "url": "/"
  }
}
```

## 📋 3. Crear Notificación en el Sistema

### Endpoint: POST /api/admin/notifications

**Body ejemplo**:
```json
{
  "title": "🎪 Evento Especial",
  "message": "Gran espectáculo esta noche en el Teatro del Pueblo",
  "type": "event",
  "icon": "🎭",
  "url": "/teatrodelpueblo",
  "data": {
    "priority": "high",
    "category": "entertainment"
  }
}
```

## 🔍 4. Ver Suscripciones Activas

### Endpoint: GET /api/push/subscriptions

Ver cuántos usuarios están suscritos para recibir notificaciones:

```bash
curl -X GET https://feria-pabellon-server.onrender.com/api/push/subscriptions \
  -H "Authorization: Basic $(echo -n 'admin_user:admin_password' | base64)"
```

## 🎯 5. Ejemplos de Notificaciones por Tipo

### Eventos
```json
{
  "title": "🎭 Espectáculo en Vivo",
  "body": "Romeo y Julieta - Teatro del Pueblo 8:00 PM",
  "icon": "/icon-192x192.png",
  "url": "/teatrodelpueblo"
}
```

### Deportes
```json
{
  "title": "⚽ Torneo de Fútbol",
  "body": "Final del campeonato - Feria Deportiva 6:00 PM",
  "icon": "/icon-192x192.png",
  "url": "/feriadeportiva"
}
```

### Gastronomía
```json
{
  "title": "🍴 Festival Gastronómico",
  "body": "Prueba los platillos típicos de la región",
  "icon": "/icon-192x192.png",
  "url": "/"
}
```

### Familia
```json
{
  "title": "👶 Zona Peques",
  "body": "Actividades para niños - Juegos y diversión",
  "icon": "/icon-192x192.png",
  "url": "/zonapeques"
}
```

## ⚡ Respuesta de Éxito

```json
{
  "message": "Broadcast completed (simulated)",
  "total": 5,
  "successful": 5,
  "failed": 0,
  "removed": 0,
  "payload": {
    "title": "🎪 ¡Nueva Atracción!",
    "body": "Espectáculo de fuegos artificiales a las 8:00 PM",
    "icon": "/icon-192x192.png",
    "url": "/teatrodelpueblo",
    "data": {}
  }
}
```

## 🛠️ Herramientas Recomendadas

1. **Postman**: Para probar las APIs
2. **Panel de Admin**: Interface web (si está disponible)
3. **cURL**: Para scripts automatizados
4. **Thunder Client** (VS Code): Extensión para testing

## 🔐 Notas de Seguridad

- Mantén las credenciales admin seguras
- Solo envía notificaciones relevantes
- Respeta la frecuencia para no ser spam
- Usa URLs válidas en el campo "url"