import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Temporizador from "./components/Temporizador.jsx";
import PWAUpdatePrompt from "./components/PWAUpdatePrompt.jsx";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Temporizador />} />
        </Routes>
      </Router>
      <PWAUpdatePrompt />
    </>
  )
}

export default App
