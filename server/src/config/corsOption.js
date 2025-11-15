export const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:4173',
            'http://localhost:3000',
            'http://127.0.0.1:5173',
            'https://feriapabellondearteaga.vercel.app', // Vercel deployment
            'https://feriapabellondearteaga.onrender.com', // Cliente en Render
            'https://feria-pabellon-client.onrender.com', // Cliente separado en Render
            process.env.FRONTEND_URL,
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
