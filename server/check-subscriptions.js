// Script para verificar suscripciones en MongoDB
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Subscription from './src/models/Subscription.js';

dotenv.config();

async function checkSubscriptions() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Buscar todas las suscripciones
    const subscriptions = await Subscription.find({});
    console.log(`📊 Total de suscripciones en la base de datos: ${subscriptions.length}`);

    if (subscriptions.length > 0) {
      console.log('\n📋 Suscripciones encontradas:');
      subscriptions.forEach((sub, index) => {
        console.log(`${index + 1}. DeviceId: ${sub.deviceId}`);
        console.log(`   Endpoint: ${sub.endpoint.substring(0, 50)}...`);
        console.log(`   Creado: ${sub.createdAt}`);
        console.log(`   Último visto: ${sub.lastSeen}`);
        console.log(`   UserAgent: ${sub.userAgent || 'N/A'}`);
        console.log('   ---');
      });
    } else {
      console.log('❌ No se encontraron suscripciones en la base de datos');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB');
    process.exit(0);
  }
}

checkSubscriptions();