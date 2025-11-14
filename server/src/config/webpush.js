import webpush from 'web-push';
import dotenv from 'dotenv';

dotenv.config();

/* Configure VAPID keys for web push notifications */
const SUBJECT = process.env.VAPID_SUBJECT;
const PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

if (!SUBJECT || !PUBLIC_KEY || !PRIVATE_KEY) {
    throw new Error('VAPID keys no están configuradas en las variables de entorno.');
}

webpush.setVapidDetails(
    SUBJECT,
    PUBLIC_KEY,
    PRIVATE_KEY
);

export default webpush; 