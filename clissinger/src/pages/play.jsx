import React, { useState, useEffect } from 'react';
import PointsDisplay from '../components/PointsDisplay';
import GameModeDisplay from '../components/GameModeDisplay';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/common/layout';
import TutorialDriver from '../components/TutorialDriverPlay';

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
    <div id="inicio-bienvenida" className="relative min-h-screen pb-[60px] font-sans flex flex-col">
      {/* Componente de puntos */}
      <PointsDisplay points={points} />

      {/* Tutorial */}
      <div className="mt-6">
        <p className="text-center">
          <TutorialDriver/>
        </p>
      </div>
      
      {/* Contenido principal centrado */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <GameModeDisplay selectedMode={selectedMode} />
      </div>

      {/* Footer con selección de modo */}
      <Footer selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
    </div>
  </Layout>
  );
}