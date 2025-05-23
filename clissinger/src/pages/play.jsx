import { useState, useEffect, useCallback } from 'react';
import PointsDisplay from '../components/PointsDisplay';
import GameModeDisplay from '../components/GameModeDisplay';
import Footer from '../components/Footer';
import Layout from '../components/common/layout';
import TutorialDriver from '../components/TutorialDriverPlay';
import { useSettings } from '../context/SettingsContext';


export default function Play() {
  //Obtener los puntos del usuario
  const userID = localStorage.getItem("userID");
  const { mode, setMode, setSoundEvent} = useSettings()
  const [points, setPoints] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchPoints = useCallback(async () => {
    try {
      const res = await fetch(`https://backend-woad-chi.vercel.app/api/user/${userID}`);
      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.message);
      setPoints(data.user.points);
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  }, [userID]);
  
  useEffect(() => {
    let isMounted = true;
    
    const init = async () => {
      await fetchPoints();
      
      if (isMounted && initialLoad) {
        setSoundEvent(mode);
        setInitialLoad(false);
      }
    };
    
    init();
    
    return () => {
      isMounted = false;
      setSoundEvent(null);
    };
  }, [fetchPoints, initialLoad, mode, setSoundEvent]);

  useEffect(() => {
    if (!initialLoad) {
      setSoundEvent(mode);
    }
  }, [mode, initialLoad, setSoundEvent]);

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
          <GameModeDisplay selectedMode={mode} />
        </div>
      </main>

      {/* Footer con landmark */}
      <footer>
        <Footer id="inicio-bienvenida" selectedMode={mode} setSelectedMode={setMode} />
      </footer>
    </div>
  </Layout>

  );
}