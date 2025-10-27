export const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:4173',
            'http://localhost:3000',
            'http://127.0.0.1:5173',
            'https://feriapabellondearteaga.vercel.app',
            process.env.FRONTEND_URL,
            process.env.CLIENT_URL
        ].filter(Boolean);
        
        console.log(`🔍 CORS Check - Origin: ${origin} | Allowed: ${allowedOrigins.join(', ')}`);
        
        // Permitir requests sin origin (Postman, etc)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) {
            console.log(`✅ CORS Allowed for: ${origin}`);
            callback(null, true);
        } else {
            console.log(`❌ CORS Blocked for: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};
