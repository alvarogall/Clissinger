import BotonVolverAtras from "../components/common/botonVolverAtras";
import Layout from '../components/common/layout';
import { useSettings } from '../context/SettingsContext';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

// Valores por defecto para los ajustes
const DEFAULT_VOLUME = 50;
const DEFAULT_FONT_SIZE = 2; // 'M'
const DEFAULT_DARK_MODE = false;
const DEFAULT_COLOR_BLIND = false;

const fontLabels = ['XS', 'S', 'M', 'L', 'XL'];

const Settings = ({ onClose }) => {

  // Obtén los valores actuales del contexto
  const {volume, darkMode, fontSize, colorBlind, setVolume, setDarkMode, setFontSize, setColorBlind, saveSettings } = useSettings();

  // Estados locales para los ajustes
  
  const [localVolume, setLocalVolume] = useState(volume);
  const [localFontSize, setLocalFontSize] = useState(fontSize);
  const [localDarkMode, setLocalDarkMode] = useState(darkMode);
  const [localColorBlind, setLocalColorBlind] = useState(colorBlind);
  
  // Sincroniza los estados locales con el contexto al entrar/cambiar
  useEffect(() => {
    setLocalVolume(volume);
    setLocalFontSize(fontSize);
    setLocalDarkMode(darkMode);
    setLocalColorBlind(colorBlind);
  }, [volume, fontSize, darkMode, colorBlind]);

  const navigate = useNavigate();

  const resetTutorials = () => {
    localStorage.removeItem('tutorial_inicio');
    localStorage.removeItem('tutorial_tematicas');
    localStorage.removeItem('tutorial_juego');
    alert('Tutoriales reiniciados. Se mostrarán nuevamente al navegar.');
  };

  const resetEstadisticas = () => {
    localStorage.removeItem('tematicas_desbloqueadas');
    alert('Estadísticas reiniciadas. Se reiniciarán tus temáticas desbloqueadas.');
  };

  const getFontSize = () => {
    const sizes = ['0.75rem', '0.875rem', '1rem', '1.25rem', '1.5rem'];
    return sizes[localFontSize];
  };

  // Efecto para aplicar el modo daltónico al body
  useEffect(() => {
    if (localColorBlind) {
      document.body.classList.add('daltonic');
    } else {
      document.body.classList.remove('daltonic');
    }
    // Limpieza al desmontar
    return () => document.body.classList.remove('daltonic');
  }, [localColorBlind]);

  // Reestablecer ajustes a valores por defecto
  const resetSettings = () => {
    setLocalVolume(DEFAULT_VOLUME);
    setLocalFontSize(DEFAULT_FONT_SIZE);
    setLocalDarkMode(DEFAULT_DARK_MODE);
    setLocalColorBlind(DEFAULT_COLOR_BLIND);
  };

  // Guardar cambios en el contexto global y localStorage
  const handleSave = () => {
    setVolume(localVolume);
    setDarkMode(localDarkMode);
    setFontSize(localFontSize);
    setColorBlind(localColorBlind);
    saveSettings(localVolume, localDarkMode, localFontSize, localColorBlind);
  };

 

  return (
    <Layout>
        <main
          className={`min-h-screen flex flex-col items-center py-10 px-4 transition-all duration-300`}
          style={{
            background: localDarkMode
              ? 'linear-gradient(to bottom, #1e1e1e, #3a3a3a)'
              : localColorBlind
                ? 'linear-gradient(to bottom, #f7e600, #00a2e8)' // Ejemplo de fondo daltónico
                : 'linear-gradient(to bottom, #1e3a8a, #2563eb)',
            color: localDarkMode ? '#fff' : '#fff',
            fontSize: getFontSize(),
          }}
        >
          <h1 className="text-5xl font-extrabold mb-10">AJUSTES</h1>

          <div className="w-full max-w-xl space-y-6">
            {/* Volumen */}
            <div className="bg-white text-black p-4 rounded-2xl shadow-md">
              <label for="volume" className="block font-semibold mb-2">Volumen general</label>
              <input id="volume"
                type="range"
                min="0"
                max="100"
                value={localVolume}
                onChange={(e) => setLocalVolume(Number(e.target.value))}
                className="w-full accent-gray-500"
              />
            </div>

            {/* Tamaño de fuente */}
            <div className="bg-white text-black p-4 rounded-2xl shadow-md">
              <label for="font-size" className="block font-semibold mb-2">Tamaño de fuente</label>
              <div className="flex justify-between text-xs px-1 mb-1">
                {fontLabels.map((label, idx) => (
                  <span key={idx}>{label}</span>
                ))}
              </div>
              <input id="font-size"
                type="range"
                min="0"
                max="4"
                value={localFontSize}
                onChange={(e) => setLocalFontSize(Number(e.target.value))}
                className="w-full accent-gray-500"
              />
            </div>

            {/* Modo oscuro */}
            <div className="bg-white text-black p-4 rounded-2xl shadow-md flex justify-between items-center">
              <label for="dark-mode" className="font-semibold">Modo oscuro</label>
              <input id="dark-mode"
                type="checkbox"
                checked={localDarkMode}
                onChange={() => setLocalDarkMode(!localDarkMode)}
                className="w-6 h-6 accent-blue-600"
              />
            </div>

            {/* Modo daltónico */}
            <div className="bg-white text-black p-4 rounded-2xl shadow-md flex justify-between items-center">
              <label for="color-blind" className="font-semibold">Modo daltónico</label>
              <input id="color-blind"
                type="checkbox"
                checked={localColorBlind}
                onChange={() => setLocalColorBlind(!localColorBlind)}
                className="w-6 h-6 accent-blue-600"
              />
            </div>

            {/* Botones */}
            <div className="flex flex-wrap gap-2 justify-between items-center mt-10">
              <button onClick={resetEstadisticas} className="bg-red-600 text-white font-semibold px-4 py-2 rounded shadow-lg hover:bg-red-700 transition">
                Reiniciar Estadísticas
              </button>

              <button
                onClick={resetTutorials}
                className="bg-red-600 text-white font-semibold px-4 py-2 rounded shadow-lg hover:bg-red-700 transition">
                Reiniciar Tutoriales
              </button>

              <button
                onClick={resetSettings}
                className="bg-red-600 text-white font-semibold px-4 py-2 rounded shadow-lg hover:bg-red-700 transition"
              >
                Reestablecer Ajustes
              </button> 
            </div>
            <div>
              <button
                onClick={handleSave}
                className="bg-[#1E3A8A] text-white font-bold px-8 py-2 rounded-full shadow-md hover:bg-[#1B347C] transition mt-4"
              >
                GUARDAR
              </button>
            </div>
          </div>

          <div className="flex absolute top-5 left-5">
            {onClose ? (
              <button
                onClick={onClose}
                className="text-lg font-semibold hover:underline"
              >
                ← Volver
              </button>
            ) : (
              <BotonVolverAtras />
            )}
          </div>
        </main>
    </Layout>
  );
};

export default Settings;
