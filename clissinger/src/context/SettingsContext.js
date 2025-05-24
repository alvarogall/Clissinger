import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import modoNormal from '../assets/modonormal.mp3';
import modoRayo from '../assets/modorayo.mp3';
import modoRuleta from '../assets/modoruleta.mp3';
import victoria1 from '../assets/victoria1.mp3';
import victoria2 from '../assets/victoria2.mp3';
import derrota from '../assets/derrota.mp3';
const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(2);
  const [colorBlind, setColorBlind] = useState(false);
  const [volume, setVolume] = useState(50);  
  const [mode, setMode] = useState('normal');
  const [soundEvent, setSoundEvent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const lastModeRef = useRef(mode);
  // Nuevo: para asegurar que solo se reproduce una vez
  const eventTriggeredRef = useRef(false);

  const navigate = useNavigate();
  const audioRef = useRef(null);
  const location = useLocation();

  // Función para verificar si estamos en una página donde debe sonar música
  const shouldPlayMusic = useCallback(() => {
    // Añadí las rutas de victoria y derrota explícitamente
    const musicRoutes = ['/ajustes', '/jugar', '/tematicas', '/juego', '/ruleta', '/score/victoria', '/score/derrota'];
    return musicRoutes.some(route => location.pathname.startsWith(route));
  }, [location.pathname]);

  // Este efecto detecta cambios en el modo y actualiza el sonido
  useEffect(() => {
    // Si el modo cambió y estamos en una página donde debería sonar música
    if (mode !== lastModeRef.current && shouldPlayMusic()) {
      // Detener cualquier audio previo
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      // Forzar un cambio de audio estableciendo el soundEvent al modo actual
      setSoundEvent(mode);
      lastModeRef.current = mode;
    }
  }, [mode, shouldPlayMusic]);

  // NUEVO: Efecto específico para eventos especiales (victoria/derrota)
  useEffect(() => {
    // Solo manejar eventos especiales aquí
    if (soundEvent !== 'victoria' && soundEvent !== 'derrota') {
      return;
    }
    
    console.log(`Detectado evento especial: ${soundEvent}`);
    
    // Asegurar que solo se dispare una vez
    if (eventTriggeredRef.current) {
      return;
    }
    
    eventTriggeredRef.current = true;
    
    // Detener cualquier audio en reproducción
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    
    let src;
    if (soundEvent === 'victoria') {
      const opciones = [victoria1, victoria2];
      const newIndex = Math.floor(Math.random() * opciones.length);
      src = opciones[newIndex];
      console.log("Reproduciendo sonido de victoria", src);
    } else {
      src = derrota;
      console.log("Reproduciendo sonido de derrota", src);
    }
    
    // Crear nuevo audio con máxima prioridad
    const audio = new Audio(src);
    audio.volume = volume / 100;
    audio.loop = false;
    
    // Usar preload para asegurar carga
    audio.preload = 'auto';
    
    // Manejar finalización
    audio.onended = () => {
      console.log(`Sonido de ${soundEvent} finalizado`);
      setSoundEvent(null);
      setCurrentTrack(null);
      setIsPlaying(false);
      eventTriggeredRef.current = false;
      audioRef.current = null;
    };
    
    // Método alternativo: usar setTimeout para dar tiempo al navegador
    setTimeout(() => {
      console.log("Intentando reproducir después del timeout");
      audio.play()
        .then(() => {
          console.log(`Reproducción de ${soundEvent} exitosa`);
          setIsPlaying(true);
          setCurrentTrack(soundEvent);
        })
        .catch(err => {
          console.error(`Error al reproducir ${soundEvent}:`, err);
          // Reintentar con interacción del usuario si es necesario
          eventTriggeredRef.current = false;
        });
    }, 100);
    
    audioRef.current = audio;
    
  }, [soundEvent, volume]);

  // Este efecto determina qué audio debe reproducirse para música de fondo
  useEffect(() => {
    // Ignorar eventos especiales, son manejados por otro efecto
    if (soundEvent === 'victoria' || soundEvent === 'derrota') {
      return;
    }
    
    // Si no estamos en una página de música, pausamos
    if (!shouldPlayMusic()) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      return;
    }

    let src = null;
    let newTrack = null;
    
    // Música del modo actual
    switch (mode) {
      case 'lightning':
        src = modoRayo;
        newTrack = 'lightning';
        break;
      case 'ruleta': 
        src = modoRuleta;
        newTrack = 'ruleta';
        break;
      case 'normal':
      default:
        src = modoNormal;
        newTrack = 'normal';
        break;
    }
    
    // Si el evento era un cambio de modo, limpiar el evento
    if (soundEvent === mode) {
      setTimeout(() => {
        setSoundEvent(null);
      }, 0);
    }

    // Verificamos si necesitamos cambiar la pista
    const needToChangeTrack = newTrack !== currentTrack || !audioRef.current;

    if (needToChangeTrack) {
      // IMPORTANTE: Siempre detenemos cualquier audio anterior
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";  // Liberar recursos
        audioRef.current = null;
      }

      // Solo crear nuevo audio si tenemos una fuente
      if (src) {
        // Crear un nuevo elemento de audio
        const audio = new Audio(src);
        audio.volume = volume / 100;
        audio.loop = true;
        
        // Reproducir audio
        audio.play()
          .then(() => {
            setIsPlaying(true);
            setCurrentTrack(newTrack);
          })
          .catch((err) => console.warn('Error al reproducir audio de fondo', err));
        
        audioRef.current = audio;
      }
    } else if (audioRef.current && audioRef.current.paused && shouldPlayMusic()) {
      // Si el audio está pausado y debería sonar, reanudarlo
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.warn('Error al reanudar audio', err));
    } else if (audioRef.current) {
      // Si ya está sonando, actualizar el volumen
      audioRef.current.volume = volume / 100;
    }
  }, [mode, soundEvent, volume, shouldPlayMusic, currentTrack]);

  // Actualizar el volumen si cambia mientras se está reproduciendo
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Función para detener el audio completamente
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = ""; // Liberar recursos
      audioRef.current.currentTime = 0;
      audioRef.current = null;
      setIsPlaying(false);
      setCurrentTrack(null);
    }
    // Resetear el detector de eventos
    eventTriggeredRef.current = false;
  };

  const saveSettings = (newVolume, newDarkMode, newFontSize, newColorBlind) => {
    setVolume(newVolume);
    setDarkMode(newDarkMode);
    setFontSize(newFontSize);
    setColorBlind(newColorBlind);

    localStorage.setItem('volume', newVolume);
    localStorage.setItem('darkMode', newDarkMode);
    localStorage.setItem('fontSize', newFontSize);
    localStorage.setItem('colorBlind', newColorBlind);
    localStorage.setItem("userInteracted", "true");
    navigate("/jugar");
  };

  return (
    <SettingsContext.Provider value={{
      darkMode, setDarkMode,
      fontSize, setFontSize,
      colorBlind, setColorBlind,
      volume, setVolume,
      mode, setMode,
      soundEvent, setSoundEvent,
      stopAudio,
      saveSettings,
      isPlaying
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);