import React from 'react';
import lightningIcon from '../images/lightning.svg'; // Icono para modo relámpago
import towerIcon from '../images/tower.svg';         // Icono para modo normal
import lockIcon from '../images/lock.svg';           // NUEVO: Icono de candado

export default function Footer({ selectedMode, setSelectedMode }) {
  return (
    <div className="fixed bottom-0 w-full bg-[#1E3A8A] py-6 flex justify-around items-center gap-6 sm:gap-8">
      {/* Modo relámpago */}
      <div
        onClick={() => setSelectedMode('lightning')}
        className={`flex flex-col sm:flex-row items-center justify-center gap-2 w-24 h-20 sm:w-60 sm:h-20 bg-blue-500 rounded-md cursor-pointer transition-transform ${
          selectedMode === 'lightning' ? 'translate-y-[-50%] scale-110' : ''
        } hover:scale-105`}
      >
        <img src={lightningIcon} alt="Modo relámpago" className="w-8 h-8" />
        <span className="hidden sm:inline text-white font-bold text-lg sm:text-xl">Modo Relámpago</span>
      </div>

      {/* Modo normal */}
      <div
        onClick={() => setSelectedMode('normal')}
        className={`flex flex-col sm:flex-row items-center justify-center gap-2 w-24 h-20 sm:w-60 sm:h-20 bg-blue-500 rounded-md cursor-pointer transition-transform ${
          selectedMode === 'normal' ? 'translate-y-[-50%] scale-110' : ''
        } hover:scale-105`}
      >
        <img src={towerIcon} alt="Modo normal" className="w-8 h-8" />
        <span className="hidden sm:inline text-white font-bold text-lg sm:text-2xl">Modo Normal</span>
      </div>

      {/* Modo futuro bloqueado */}
      <div
        className="flex flex-col sm:flex-row items-center justify-center gap-2 w-24 h-20 sm:w-60 sm:h-20 bg-gray-500 rounded-md cursor-not-allowed opacity-60"
        title="Este modo estará disponible próximamente"
      >
        <img src={lockIcon} alt="Modo futuro bloqueado" className="w-8 h-8" />
        <span className="hidden sm:inline text-white font-bold text-lg sm:text-2xl">Modo Futuro</span>
      </div>
    </div>
  );
}
