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

  const navigate = useNavigate();
  const audioRef = useRef(null);
  const location = useLocation();

  // Función para verificar si estamos en una página donde debe sonar música
  const shouldPlayMusic = useCallback(() => {
    const musicRoutes = ['/jugar', '/tematicas', '/juego', '/ruleta', '/score'];
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

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    const storedFontSize = localStorage.getItem('fontSize');
    const storedColorBlind = localStorage.getItem('colorBlind');
    const storedVolume = localStorage.getItem('volume'); 

    if (storedDarkMode !== null) setDarkMode(storedDarkMode === 'true');
    if (storedFontSize !== null) setFontSize(Number(storedFontSize));
    if (storedColorBlind !== null) setColorBlind(storedColorBlind === 'true');
    if (storedVolume !== null) setVolume(Number(storedVolume)); 
  }, []);

  const lastSongIndexRef = useRef(null);

  // Este efecto determina qué audio debe reproducirse
  useEffect(() => {
    // Si no estamos en una página de música y no hay evento de sonido, pausamos
    if (!shouldPlayMusic() && !soundEvent) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      return;
    }

    let src = null;
    let loop = true;
    let newTrack = null;
    
    // Determinamos qué pista debe sonar
    if (soundEvent === 'victoria') {
      const opciones = [victoria1, victoria2];
      let newIndex;

      do {
        newIndex = Math.floor(Math.random() * opciones.length);
      } while (newIndex === lastSongIndexRef.current && opciones.length > 1);

      lastSongIndexRef.current = newIndex;
      src = opciones[newIndex];
      newTrack = `victoria_${newIndex}`;
      loop = false;
    } else if (soundEvent === 'derrota') {
      src = derrota;
      newTrack = 'derrota';
      loop = false;
    } else if (soundEvent === mode || shouldPlayMusic()) {
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
    }

    // Verificamos si necesitamos cambiar la pista
    const needToChangeTrack = newTrack !== currentTrack || soundEvent === mode || !audioRef.current;

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
        audio.loop = loop;
        
        // Configurar eventos antes de reproducir
        if (!loop) {
          audio.onended = () => {
            setSoundEvent(null);
            setIsPlaying(false);
            setCurrentTrack(null);
            // Aseguramos que se liberen recursos
            if (audioRef.current === audio) {
              audioRef.current = null;
            }
          };
        }
        
        // Reproducir audio
        audio.play()
          .then(() => {
            setIsPlaying(true);
            setCurrentTrack(newTrack);
          })
          .catch((err) => console.warn('Error al reproducir audio', err));
        
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

    return () => {
      // No liberamos el audio al cambiar de página para permitir continuidad
      // Solo limpiamos si es un sonido especial que no debe continuar
      if (!loop && audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";  // Liberar recursos
        audioRef.current = null;
        setIsPlaying(false);
        setCurrentTrack(null);
      }
    };
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