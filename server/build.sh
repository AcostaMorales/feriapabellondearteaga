#!/bin/bash
# build.sh para Render

echo "📦 Instalando dependencias del servidor..."
cd server && npm install

echo "📁 Verificando estructura de archivos..."
find src -name "*.js" | head -20

echo "✅ Build completado"