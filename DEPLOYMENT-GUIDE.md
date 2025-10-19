# 🚀 Guía Completa de Despliegue - PWA + Apps Nativas

## 📋 Resumen de la Configuración

- **Frontend**: React + Vite + PWA → Vercel
- **Backend**: Node.js + Express + MongoDB → Render
- **Apps Nativas**: Capacitor → Google Play Store + App Store

---

## 🌐 PASO 1: Desplegar Backend en Render

### 1. Preparar el Backend

1. Crea un archivo `.env` en `/server/`:
```bash
# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/feriapabellondearteaga?retryWrites=true&w=majority

# CORS
FRONTEND_URL=https://feria-pabellon.vercel.app

# Puerto (Render lo asigna automáticamente)
PORT=5000

# Entorno
NODE_ENV=production
```

### 2. Configurar en Render

1. Ve a [render.com](https://render.com)
2. Conecta tu repositorio de GitHub
3. Crea un **Web Service**
4. Configuración:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Agrega las variables de entorno desde tu archivo `.env`

### 3. Obtén tu URL de Render
Algo como: `https://tu-app.onrender.com`

---

## 🎨 PASO 2: Desplegar Frontend en Vercel

### 1. Actualizar Variables de Entorno

Edita `/client/.env.production`:
```bash
VITE_APP_URL=https://tu-app.onrender.com
```

### 2. Instalar Dependencias PWA

```bash
cd client
npm install vite-plugin-pwa workbox-window @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
```

### 3. Configurar en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Importa tu repositorio
3. Configuración:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build:pwa`
   - **Output Directory**: `dist`
4. En **Environment Variables**:
   - `VITE_APP_URL`: `https://tu-app.onrender.com`

---

## 📱 PASO 3: Configurar PWA

### 1. Generar Iconos PWA

Necesitas crear estos iconos en `/client/public/`:
- `pwa-192x192.png` (192x192)
- `pwa-512x512.png` (512x512)
- `apple-touch-icon.png` (180x180)
- `favicon-32x32.png` (32x32)
- `favicon-16x16.png` (16x16)

**Herramientas recomendadas:**
- [PWA Asset Generator](https://www.pwabuilder.com/)
- [Favicon Generator](https://realfavicongenerator.net/)

### 2. Verificar PWA

Después del despliegue:
1. Abre tu app en Chrome
2. Ve a DevTools → Application → Manifest
3. Verifica que todos los iconos cargan
4. Prueba la instalación desde el navegador

---

## 📱 PASO 4: Preparar para Apps Nativas (Capacitor)

### 1. Inicializar Capacitor

```bash
cd client
npx cap init "Feria Pabellón de Arteaga" "com.feria.pabellondearteaga"
```

### 2. Agregar Plataformas

```bash
# Android
npx cap add android

# iOS (solo en macOS)
npx cap add ios
```

### 3. Configurar para Producción

Edita `capacitor.config.json`:
```json
{
  "server": {
    "url": "https://feria-pabellon.vercel.app",
    "cleartext": true
  }
}
```

### 4. Construir la App

```bash
# Construir y sincronizar
npm run build:pwa
npx cap sync

# Abrir en Android Studio
npx cap open android

# Abrir en Xcode (macOS)
npx cap open ios
```

---

## 🏪 PASO 5: Publicar en Tiendas

### Google Play Store (Android)

1. **Preparar el APK/AAB**:
   - Abre el proyecto en Android Studio
   - Build → Generate Signed Bundle/APK
   - Sigue el asistente para firmar la app

2. **Subir a Google Play Console**:
   - Ve a [play.google.com/console](https://play.google.com/console)
   - Crea una nueva aplicación
   - Sube tu AAB firmado
   - Completa la información de la tienda

### App Store (iOS)

1. **Preparar en Xcode**:
   - Abre el proyecto en Xcode
   - Configura el Bundle Identifier
   - Selecciona el equipo de desarrollo
   - Archive → Upload to App Store

2. **App Store Connect**:
   - Ve a [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
   - Crea una nueva app
   - Sube tu archivo .ipa
   - Completa la información

---

## 🔧 Scripts Útiles

### Package.json - Cliente
```json
{
  "scripts": {
    "build:pwa": "vite build --mode production",
    "android": "npm run build:pwa && npx cap copy && npx cap open android",
    "ios": "npm run build:pwa && npx cap copy && npx cap open ios",
    "sync": "npx cap sync"
  }
}
```

---

## ✅ Checklist Final

### Backend (Render)
- [ ] Variables de entorno configuradas
- [ ] MongoDB Atlas conectado
- [ ] CORS configurado para Vercel
- [ ] Health check funcionando

### Frontend (Vercel)
- [ ] Build exitoso
- [ ] Variables de entorno configuradas
- [ ] PWA manifest válido
- [ ] Service Worker registrado
- [ ] Iconos PWA generados

### Apps Nativas
- [ ] Capacitor configurado
- [ ] Plataformas agregadas
- [ ] Sincronización exitosa
- [ ] Tests en dispositivos reales

### Tiendas
- [ ] Cuentas de desarrollador creadas
- [ ] Apps firmadas
- [ ] Metadatos completos
- [ ] Screenshots preparados

---

## 🛠️ Comandos de Desarrollo

```bash
# Desarrollo local
cd client && npm run dev
cd server && npm run dev

# Build PWA
cd client && npm run build:pwa

# Probar PWA localmente
cd client && npm run preview

# Sincronizar con Capacitor
cd client && npx cap sync

# Abrir en IDE nativo
cd client && npm run android  # Android Studio
cd client && npm run ios      # Xcode
```

¿Necesitas ayuda con algún paso específico?