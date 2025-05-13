import React, { useState } from 'react';
import PointsDisplay from '../components/PointsDisplay';
import GameModeDisplay from '../components/GameModeDisplay';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/common/layout';
import { useEffect } from 'react';

export default function Play() {
  const [selectedMode, setSelectedMode] = useState('normal'); // Estado del modo seleccionado

  //Obtener los puntos del usuario
  const userID = localStorage.getItem("userID");
  const [points, setPoints] = useState(0);
  const navigate = useNavigate();
  const fetchPoints = async () => {
    try {
      const res = await fetch(`https://backend-woad-chi.vercel.app/api/user/${userID}`);
      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.message);
      setPoints(data.user.points);
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  };
  
  useEffect(() => {
    fetchPoints();
  }, []);

  return (
    <Layout>
    <div className="relative h-screen bg-[#1C2C54] text-white font-sans">
      {/* Componente de puntos */}
      <PointsDisplay points={points} />

      {/* Componente de modo de juego */}
      <GameModeDisplay selectedMode={selectedMode} />

      {/* Footer con selección de modo */}
      <Footer selectedMode={selectedMode} setSelectedMode={setSelectedMode} />

    </div>
    </Layout>
  );
}
