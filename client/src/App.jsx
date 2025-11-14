import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import './styles/global.css'
import Temporizador from "./components/Temporizador.jsx";
import Home from "./pages/Home.jsx";
import AppHeader from "./components/AppHeader.jsx";
import AppFooter from "./components/AppFooter.jsx";
import PWAUpdatePrompt from "./components/PWAUpdatePrompt.jsx";
import TeatroDelPueblo from "./pages/TeatroDelPueblo.jsx";
import Coronacion from "./pages/Coronacion.jsx";
import CorridaDeToros from "./pages/CorridaDeToros.jsx";
import TeatroBicentenario from "./pages/TeatroBicentenario.jsx";
import FeriaDeportiva from "./pages/FeriaDeportiva.jsx";
import ForoJuvenil from "./pages/ForoJuvenil.jsx";
import PlazaDelAbuelo from "./pages/PlazaDelAbuelo.jsx";
import LienzoCharro from "./pages/LienzoCharro.jsx";

function AppLayout() {
  const location = useLocation();
  
  // El temporizador es la página principal y no necesita header ni footer
  const isTimerPage = location.pathname === '/';
  // Home es la página principal después del temporizador
  const isHomePage = location.pathname === '/home';
  
  const handleNotificationClick = () => {
    console.log('Notificación clickeada');
    // Aquí puedes implementar la lógica de notificaciones
  };

  return (
    <div className="app-layout">
      {/* Header solo en páginas que no sean el temporizador */}
      {!isTimerPage && (
        <AppHeader 
          showBackButton={!isHomePage} // No mostrar botón de regreso en Home
          onNotificationClick={handleNotificationClick}
        />
      )}
      
      {/* Contenido principal */}
      <main className={`main-content ${isTimerPage ? 'timer-full-screen' : ''}`}>
        <Routes>
          <Route path="/" element={<Temporizador />} />
          <Route path="/home" element={<Home />} />
          <Route path="/teatrodelpueblo" element={<TeatroDelPueblo />} />
          <Route path="/coronacion" element={<Coronacion />} />
          <Route path="/corridasdetoros" element={<CorridaDeToros />} />
          <Route path="/teatrobicentenario" element={<TeatroBicentenario />} />
          <Route path="/feriadeportiva" element={<FeriaDeportiva />} />
          <Route path="/forojuvenil" element={<ForoJuvenil />} />
          <Route path="/plazadelabuelo" element={<PlazaDelAbuelo />} />
          <Route path="/lienzocharro" element={<LienzoCharro />} />
        </Routes>
      </main>
      
      {/* Footer solo en páginas que no sean el temporizador */}
      {!isTimerPage && <AppFooter />}
    </div>
  );
}

function App() {
  return (
    <>
      <Router>
        <AppLayout />
      </Router>
      <PWAUpdatePrompt />
    </>
  )
}

export default App
