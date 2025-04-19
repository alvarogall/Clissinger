import React, { useState } from 'react';
import PointsDisplay from '../components/PointsDisplay';
import GameModeDisplay from '../components/GameModeDisplay';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import BotonAjustes from '../components/common/botonAjustes'; 
import Layout from '../components/common/layout';

export default function Play() {
  const [selectedMode, setSelectedMode] = useState('normal'); // Estado del modo seleccionado

 

  return (
    <Layout>
    <div className="relative h-screen bg-[#1C2C54] text-white font-sans">
      {/* Componente de puntos */}
      <PointsDisplay points={50} />

      {/* Componente de modo de juego */}
      <GameModeDisplay selectedMode={selectedMode} />

      {/* Footer con selección de modo */}
      <Footer selectedMode={selectedMode} setSelectedMode={setSelectedMode} />

      {/* Componente de Boton de Ajustes*/}
      <div className="flex justify-center my-6 border-4">
        <BotonAjustes/>
      </div>
    </div>
    </Layout>
  );
}
