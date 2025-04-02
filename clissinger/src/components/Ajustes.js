import React, { useState } from 'react';

const Ajustes = () => {
  const [volume, setVolume] = useState(50);
  const [fontSize, setFontSize] = useState(2);
  const [darkMode, setDarkMode] = useState(false);
  const [colorBlind, setColorBlind] = useState(false);

  const fontLabels = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 flex flex-col items-center py-10 px-4 text-white">
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
          <button className="bg-red-600 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-red-700 transition">
            Reiniciar estadísticas
          </button>

          <button className="bg-yellow-400 text-white font-bold px-8 py-2 rounded-full shadow-md hover:bg-yellow-500 transition">
            GUARDAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ajustes;
