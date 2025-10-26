import webpush from 'web-push';

// Generar claves VAPID
const vapidKeys = webpush.generateVAPIDKeys();

console.log('=== CLAVES VAPID GENERADAS ===');
console.log('VAPID_PUBLIC_KEY=' + vapidKeys.publicKey);
console.log('VAPID_PRIVATE_KEY=' + vapidKeys.privateKey);
console.log('VAPID_SUBJECT=mailto:admin@feriapabellondearteaga.com');
console.log('=====================================');