import React from 'react';

const InstallRedirect = () => {
    React.useEffect(() => {
        // Detectar el navegador y sistema operativo
        const userAgent = navigator.userAgent;
        const isAndroid = /Android/i.test(userAgent);
        const isIOS = /iPad|iPhone|iPod/.test(userAgent);
        const isChrome = /Chrome/i.test(userAgent);
        const isSafari = /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent);

        // URLs automáticas según el navegador
        const redirectTo = () => {
            if (isAndroid && isChrome) {
                // Intent URL para Android Chrome
                window.location.href = 'intent://feriapabellondearteaga-client-vykm.vercel.app#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=https://feriapabellondearteaga-client-vykm.vercel.app;end';
            } else if (isIOS && isSafari) {
                // Smart App Banner para iOS
                window.location.href = 'https://feriapabellondearteaga-client-vykm.vercel.app';
            } else {
                // Fallback para otros navegadores
                window.location.href = 'https://feriapabellondearteaga-client-vykm.vercel.app/?autoinstall=true';
            }
        };

        // Redirigir después de mostrar información
        setTimeout(redirectTo, 3000);
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1>🚀 Redirigiendo a la instalación...</h1>
                <p>Te estamos llevando a la mejor experiencia de instalación para tu dispositivo.</p>
                <div style={styles.spinner}></div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center'
    },
    content: {
        padding: '40px'
    },
    spinner: {
        width: '40px',
        height: '40px',
        border: '4px solid rgba(255,255,255,0.3)',
        borderTop: '4px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '20px auto'
    }
};

export default InstallRedirect;