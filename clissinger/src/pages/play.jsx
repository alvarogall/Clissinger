import React, { useState } from 'react';
import PointsDisplay from '../components/PointsDisplay';
import GameModeDisplay from '../components/GameModeDisplay';
import Footer from '../components/Footer';

export default function Play() {
  const [selectedMode, setSelectedMode] = useState('normal'); // Estado del modo seleccionado

  return (
    <div className="relative h-screen bg-[#1C2C54] text-white font-sans">
      {/* Componente de puntos */}
      <PointsDisplay points={50} />

      {/* Componente de modo de juego */}
      <GameModeDisplay selectedMode={selectedMode} />

      {/* Footer con selección de modo */}
      <Footer selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
    </div>
  );
}
