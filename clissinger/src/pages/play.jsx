import { useState, useEffect, useRef  } from 'react';
import PointsDisplay from '../components/PointsDisplay';
import GameModeDisplay from '../components/GameModeDisplay';
import Footer from '../components/Footer';
import Layout from '../components/common/layout';
import TutorialDriver from '../components/TutorialDriverPlay';
import { useSettings } from '../context/SettingsContext';
import { playMusic, stopMusic } from '../components/utils/Musica';

import modoNormal from '../assets/modonormal.mp3';
import modoRayo from '../assets/modorayo.mp3';
import modoRuleta from '../assets/modoruleta.mp3';

export default function Play() {
  
  const [selectedMode, setSelectedMode] = useState('normal'); // Estado del modo seleccionado

  //Obtener los puntos del usuario
  const { volume } = useSettings();
  const userID = localStorage.getItem("userID");
  const [points, setPoints] = useState(0);
  const audioRef = useRef(null);
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
  });

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

   let audioSrc;

    switch (selectedMode) {
      case 'lightning':
        audioSrc = modoRayo;
        break;
      case 'ruleta':
        audioSrc = modoRuleta;
        break;
      case 'normal':
      default:
        audioSrc = modoNormal;
        break;
    }
    const audio = new Audio(audioSrc);
    audio.volume = volume / 100;
    audio.loop = true;

    audioRef.current = audio;

    audio.play().catch((err) => {
      console.warn('Audio play interrupted or blocked:', err);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [selectedMode, volume]);

  return (
  <Layout>
    <div className="relative min-h-screen pb-[60px] font-sans flex flex-col">
       <TutorialDriver />
      {/* Header opcional */}
      <header className="sr-only">
        <h1>Modo de Juego</h1> 
      </header>

      {/* Región principal */}
      <main className="flex-1 flex flex-col">
        {/* Componente de puntos */}
        <PointsDisplay points={points} />

        {/* Contenido principal centrado */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <GameModeDisplay selectedMode={selectedMode} />
        </div>
      </main>

      {/* Footer con landmark */}
      <footer>
        <Footer id="inicio-bienvenida" selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
      </footer>
    </div>
  </Layout>

  );
}