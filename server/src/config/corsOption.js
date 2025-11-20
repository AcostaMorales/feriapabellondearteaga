export const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            process.env.CLIENT_URL_PRODUCTION,
            process.env.SERVER_URL,
            process.env.CLIENT_URL
        ].filter(Boolean);
        
        console.log(`🔍 CORS Check - Origin: ${origin} | Allowed: ${allowedOrigins.join(', ')}`);
        
        // Permitir requests sin origin (Postman, etc)
        if (!origin) return callback(null, true);
        
        // Verificar si el origin está en la lista de permitidos
        const isAllowed = allowedOrigins.includes(origin) || 
                         (origin && origin.includes('onrender.com')) || // Permitir subdominios de Render
                         (origin && origin.includes('vercel.app'));     // Permitir subdominios de Vercel
        
        if (isAllowed) {
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
