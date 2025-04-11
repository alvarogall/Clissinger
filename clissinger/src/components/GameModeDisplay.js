import React from 'react';
import towerIcon from '../images/tower.svg'; // Icono para modo normal
import cardsIcon from '../images/cards.svg'; // Icono para modo relámpago

export default function GameModeDisplay({ selectedMode }) {
  const iconSrc = selectedMode === 'normal' ? towerIcon : cardsIcon;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Icono del modo */}
      <img
        key={iconSrc} // Cambiará cada vez que cambie el modo
        src={iconSrc}
        alt="Icono del modo"
        className="w-64 h-64 opacity-0 translate-y-[-20px] animate-fade-in-down"
      />

      {/* Botón jugar */}
      <button
        className="mt-6 px-12 py-4 bg-[#FFCF25] rounded-full text-white font-extrabold text-5xl uppercase hover:scale-95 active:scale-90 transition-transform"
      >
        JUGAR
      </button>
    </div>
  );
}
