import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import './styles/global.css'
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
import DesfileDelaRevolucion from "./pages/DesfileDelaRevolucion.jsx";
import VocesDelPueblo from "./pages/VocesDelPueblo.jsx";
import ZonaPeques from "./pages/ZonaPeques.jsx";
import ExpoGanadera from "./pages/ExpoGanadera.jsx";
import Notificaciones from "./pages/Notificaciones.jsx";


function AppLayout() {
  const location = useLocation();
  
  // Home es ahora la página principal
  const isHomePage = location.pathname === '/';
  
  const handleNotificationClick = () => {
    // Navegar a la página de notificaciones
    window.location.href = '/notificaciones';
  };

  return (
    <div className="app-layout">
      {/* Header en todas las páginas */}
      <AppHeader 
        showBackButton={!isHomePage} // No mostrar botón de regreso en Home
        onNotificationClick={handleNotificationClick}
      />
      
      {/* Contenido principal */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teatrodelpueblo" element={<TeatroDelPueblo />} />
          <Route path="/coronacion" element={<Coronacion />} />
          <Route path="/corridasdetoros" element={<CorridaDeToros />} />
          <Route path="/teatrobicentenario" element={<TeatroBicentenario />} />
          <Route path="/feriadeportiva" element={<FeriaDeportiva />} />
          <Route path="/forojuvenil" element={<ForoJuvenil />} />
          <Route path="/plazadelabuelo" element={<PlazaDelAbuelo />} />
          <Route path="/lienzocharro" element={<LienzoCharro />} />
          <Route path="/desfiledelarevolucion" element={<DesfileDelaRevolucion />} />
          <Route path="/vocesdelpueblo" element={<VocesDelPueblo />} />
          <Route path="/zonapeques" element={<ZonaPeques />} />
          <Route path="/expoganadera" element={<ExpoGanadera />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
         
        </Routes>
      </main>
      
      {/* Footer en todas las páginas */}
      <AppFooter />
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
