import BotonVolverAtras from "../components/common/botonVolverAtrasMenu";
import { useSettings } from '../context/SettingsContext'; 
import Layout from '../components/common/layout';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

const Settings = () => {
  const [volume, setVolume] = useState(50);
  const { darkMode, setDarkMode, fontSize, setFontSize, saveSettings } = useSettings();
  const [colorBlind, setColorBlind] = useState(false);
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

  

  const fontLabels = ['XS', 'S', 'M', 'L', 'XL'];
  const getFontSize = () => {
    const sizes = ['0.75rem', '0.875rem', '1rem', '1.25rem', '1.5rem']; // XS a XL
    return sizes[fontSize];
  };
  

  return (
    <Layout>
    <>
      <div
        className={`min-h-screen flex flex-col items-center py-10 px-4 transition-all duration-300`}
        style={{
          background: darkMode
            ? 'linear-gradient(to bottom, #1e1e1e, #3a3a3a)'
            : 'linear-gradient(to bottom, #1e3a8a, #2563eb)',
          color: darkMode ? '#fff' : '#fff',
          fontSize: getFontSize(),
        }}
      >

        <h1 className="text-5xl font-extrabold mb-10">AJUSTES</h1>

        <div className="w-full max-w-xl space-y-6">
          {/* Volumen */}
          <div className="bg-white text-black p-4 rounded-2xl shadow-md">
            <label className="block font-semibold mb-2">Volumen general</label>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="w-full accent-gray-500"
            />
          </div>

          {/* Tamaño de fuente */}
          <div className="bg-white text-black p-4 rounded-2xl shadow-md">
            <label className="block font-semibold mb-2">Tamaño de fuente</label>
            <div className="flex justify-between text-xs px-1 mb-1">
              {fontLabels.map((label, idx) => (
                <span key={idx}>{label}</span>
              ))}
            </div>
            <input
              type="range"
              min="0"
              max="4"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="w-full accent-gray-500"
            />
          </div>

          {/* Modo oscuro */}
          <div className="bg-white text-black p-4 rounded-2xl shadow-md flex justify-between items-center">
            <label className="font-semibold">Modo oscuro</label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="w-6 h-6 accent-blue-600"
            />
          </div>

          {/* Modo daltónico */}
          <div className="bg-white text-black p-4 rounded-2xl shadow-md flex justify-between items-center">
            <label className="font-semibold">Modo daltónico</label>
            <input
              type="checkbox"
              checked={colorBlind}
              onChange={() => setColorBlind(!colorBlind)}
              className="w-6 h-6 accent-blue-600"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-between items-center mt-6">
            <button onClick={resetEstadisticas} className="bg-red-600 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-red-700 transition">
              Reiniciar Estadísticas
            </button>

            <button
              onClick={resetTutorials}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
              Reiniciar Tutoriales
            </button>

            <button onClick={() => saveSettings(darkMode, fontSize)} className="bg-yellow-400 text-white font-bold px-8 py-2 rounded-full shadow-md hover:bg-yellow-500 transition">
              GUARDAR
            </button>
          </div>
        </div>
        
        <div className="flex absolute top-5 left-5">
          <BotonVolverAtras />
        </div>
      </div>
    </>
    </Layout>
  );
};

export default Settings;
