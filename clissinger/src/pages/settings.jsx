import BotonVolverAtras from "../components/common/botonVolverAtrasMenu";
import { useSettings } from '../context/SettingsContext'; 
import Layout from '../components/common/layout';
import { useState, useEffect } from "react";

const Settings = () => {
  // Valores por defecto
  const DEFAULT_VOLUME = 50;
  const DEFAULT_FONT_SIZE = 2; // 'M'
  const DEFAULT_DARK_MODE = false;
  const DEFAULT_COLOR_BLIND = false;

  // Obtén los valores actuales del contexto
  const { darkMode, setDarkMode, fontSize, setFontSize, setColorBlind, saveSettings } = useSettings();

  const [localColorBlind, setLocalColorBlind] = useState(
    localStorage.getItem('colorBlind') === 'true' ? true : DEFAULT_COLOR_BLIND
  );
  const [localVolume, setLocalVolume] = useState(DEFAULT_VOLUME);
  const [localFontSize, setLocalFontSize] = useState(fontSize);
  const [localDarkMode, setLocalDarkMode] = useState(darkMode);

  const fontLabels = ['XS', 'S', 'M', 'L', 'XL'];
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
    setDarkMode(localDarkMode);
    setFontSize(localFontSize);
    setColorBlind(localColorBlind);
    saveSettings(localDarkMode, localFontSize, localColorBlind);
  };

  return (
    <Layout>
    <>
      <div
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
            <label className="block font-semibold mb-2">Volumen general</label>
            <input
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
              value={localFontSize}
              onChange={(e) => setLocalFontSize(Number(e.target.value))}
              className="w-full accent-gray-500"
            />
          </div>

          {/* Modo oscuro */}
          <div className="bg-white text-black p-4 rounded-2xl shadow-md flex justify-between items-center">
            <label className="font-semibold">Modo oscuro</label>
            <input
              type="checkbox"
              checked={localDarkMode}
              onChange={() => setLocalDarkMode(!localDarkMode)}
              className="w-6 h-6 accent-blue-600"
            />
          </div>

          {/* Modo daltónico */}
          <div className="bg-white text-black p-4 rounded-2xl shadow-md flex justify-between items-center">
            <label className="font-semibold">Modo daltónico</label>
            <input
              type="checkbox"
              checked={localColorBlind}
              onChange={() => setLocalColorBlind(!localColorBlind)}
              className="w-6 h-6 accent-blue-600"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={resetSettings}
              className="bg-red-600 text-white font-semibold px-8 py-2 rounded-full shadow-md hover:bg-red-700 transition"
            >
              REESTABLECER AJUSTES
            </button>

            <button
              onClick={handleSave}
              className="bg-yellow-400 text-white font-bold px-8 py-2 rounded-full shadow-md hover:bg-yellow-500 transition"
            >
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
