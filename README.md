# Feria de Pabellón de Arteaga - PWA

Aplicación Progressive Web App (PWA) oficial para la Feria de Pabellón de Arteaga 2025. Incluye temporizador de cuenta regresiva, gestión de eventos y notificaciones push.

## 🚀 Características

- ⏰ **Temporizador**: Cuenta regresiva hasta el inicio de la feria (14 de noviembre de 2025)
- 📱 **PWA**: Instalable como aplicación móvil nativa
- 🎪 **Eventos**: Programación completa de todas las actividades
- 🔔 **Notificaciones Push**: Sistema de notificaciones automáticas
- 📱 **Responsive**: Diseño optimizado para móviles
- 🎨 **Temas**: Interfaz colorida y atractiva

## 🛠 Tecnologías

### Frontend
- React 19.1.1 con Vite
- React Router para navegación
- PWA con service workers
- CSS Variables para temas
- Axios para comunicación con API

### Backend
- Node.js con Express
- MongoDB con Mongoose
- Web Push para notificaciones
- CORS configurado
- Rate limiting y seguridad

## 📁 Estructura del Proyecto

```
feriapabellondearteaga/
├── client/                 # Frontend React PWA
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/         # Páginas de eventos
│   │   ├── services/      # Comunicación con API
│   │   └── styles/        # CSS global
│   ├── public/           # Assets estáticos
│   └── vite.config.js    # Configuración Vite/PWA
├── server/                # Backend Node.js
│   ├── src/
│   │   ├── config/       # Configuraciones
│   │   ├── controllers/  # Controladores
│   │   ├── models/       # Modelos MongoDB
│   │   ├── routes/       # Rutas API
│   │   └── services/     # Servicios
│   └── .env             # Variables de entorno
└── package.json         # Configuración monorepo
```

## 🏃‍♂️ Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+
- Yarn
- MongoDB (local o Atlas)

### Desarrollo Local

1. **Clonar repositorio**
```bash
git clone https://github.com/AcostaMorales/feriapabellondearteaga.git
cd feriapabellondearteaga
```

2. **Instalar dependencias**
```bash
yarn install:all
```

3. **Configurar variables de entorno**
```bash
# Copiar archivo de ejemplo
cp server/.env.example server/.env
# Editar con tus valores
```

4. **Ejecutar en desarrollo**
```bash
yarn start  # Ejecuta cliente y servidor simultáneamente
```

### Scripts Disponibles

```bash
yarn client         # Solo frontend
yarn server         # Solo backend
yarn start          # Ambos simultáneamente
yarn build          # Build de producción
yarn preview        # Preview del build
```

## 🚀 Deploy

### Vercel (Frontend)

1. **Configurar proyecto**
   - Conectar repositorio GitHub a Vercel
   - Configurar build directory: `client`
   - Build command: `yarn build`
   - Output directory: `client/dist`

2. **Variables de entorno**
   ```
   VITE_API_URL=https://tu-backend.render.com/api
   ```

### Render (Backend)

1. **Crear Web Service**
   - Root directory: `server`
   - Build command: `yarn install`
   - Start command: `yarn start`

2. **Variables de entorno requeridas**
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://...
   FRONTEND_URL=https://tu-frontend.vercel.app
   VAPID_PUBLIC_KEY=...
   VAPID_PRIVATE_KEY=...
   VAPID_SUBJECT=mailto:tu@email.com
   ADMIN_USER=admin
   ADMIN_PASS=tu_password_seguro
   ```

### Railway (Alternativa para Backend)

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway init
railway up
```

## 🔧 Configuración

### Variables de Entorno

#### Cliente (.env en client/)
```env
VITE_API_URL=http://localhost:4000/api
```

#### Servidor (.env en server/)
```env
PORT=4000
MONGODB_URI=mongodb+srv://...
FRONTEND_URL=http://localhost:4173
VAPID_PUBLIC_KEY=...
VAPID_PRIVATE_KEY=...
VAPID_SUBJECT=mailto:...
ADMIN_USER=admin
ADMIN_PASS=...
```

### MongoDB

La aplicación requiere MongoDB para almacenar:
- Configuraciones del temporizador
- Suscripciones de notificaciones
- Logs del sistema

## 📱 PWA Features

- **Instalable**: Se puede instalar como app nativa
- **Offline**: Funciona sin conexión (limitado)
- **Push Notifications**: Notificaciones automáticas
- **Service Worker**: Cache inteligente
- **Manifest**: Iconos y configuración de app

## 🎪 Eventos Incluidos

- **Teatro Bicentenario**: Espectáculos culturales
- **Feria Deportiva**: Actividades deportivas  
- **Foro Juvenil**: Eventos para jóvenes
- **Plaza del Abuelo**: Actividades familiares
- **Lienzo Charro**: Eventos tradicionales

## 📄 API Endpoints

### Público
- `GET /api/temporizador/config` - Configuración del timer
- `POST /api/push/subscribe` - Suscribirse a notificaciones

### Admin (requiere auth)
- `GET /api/admin` - Panel de administración
- `POST /api/admin/notifications` - Enviar notificación
- `GET /api/scheduler/status` - Estado del scheduler

## 🤝 Contribución

1. Fork el proyecto
2. Crea una branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto

**Pablo Daniel Acosta Morales**
- Email: acostamoralespablodaniel@gmail.com
- GitHub: [@AcostaMorales](https://github.com/AcostaMorales)

## 🎉 Feria de Pabellón de Arteaga 2025

**Fechas**: 14-23 de Noviembre de 2025
**Ubicación**: Pabellón de Arteaga, Aguascalientes, México

---

*¡Desarrollado con ❤️ para la comunidad de Pabellón de Arteaga!*