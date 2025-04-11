import React from 'react';
import lightningIcon from '../images/cards.svg'; // Icono para modo relámpago
import towerIcon from '../images/tower.svg'; // Icono para modo normal y futuro

export default function Footer({ selectedMode, setSelectedMode }) {
  return (
    <div className="fixed bottom-0 w-full bg-[#1E3A8A] py-6 flex justify-around items-center gap-6 sm:gap-8">
      {/* Modo relámpago */}
      <div
        onClick={() => setSelectedMode('lightning')}
        className={`flex flex-col sm:flex-row items-center justify-center gap-2 w-24 h-20 sm:w-60 sm:h-20 bg-[#3B82F6] rounded-md cursor-pointer transition-transform ${
          selectedMode === 'lightning' ? 'translate-y-[-50%] scale-110' : ''
        } hover:scale-105`}
      >
        <img src={lightningIcon} alt="Modo relámpago" className="w-8 h-8" />
        <span className="hidden sm:inline text-white font-bold text-lg sm:text-2xl">Modo relámpago</span>
      </div>

      {/* Modo normal */}
      <div
        onClick={() => setSelectedMode('normal')}
        className={`flex flex-col sm:flex-row items-center justify-center gap-2 w-24 h-20 sm:w-60 sm:h-20 bg-[#3B82F6] rounded-md cursor-pointer transition-transform ${
          selectedMode === 'normal' ? 'translate-y-[-50%] scale-110' : ''
        } hover:scale-105`}
      >
        <img src={towerIcon} alt="Modo normal" className="w-8 h-8" />
        <span className="hidden sm:inline text-white font-bold text-lg sm:text-2xl">Modo normal</span>
      </div>

      {/* Modo futuro */}
      <div
        onClick={() => setSelectedMode('future')}
        className={`flex flex-col sm:flex-row items-center justify-center gap-2 w-24 h-20 sm:w-60 sm:h-20 bg-[#3B82F6] rounded-md cursor-pointer transition-transform ${
          selectedMode === 'future' ? 'translate-y-[-50%] scale-110' : ''
        } hover:scale-105`}
      >
        <img src={towerIcon} alt="Modo futuro" className="w-8 h-8" />
        <span className="hidden sm:inline text-white font-bold text-lg sm:text-2xl">Modo futuro</span>
      </div>
    </div>
  );
}
