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

  // En el efecto principal que reproduce los sonidos
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
    
    // CORRECCIÓN: Los eventos de victoria y derrota SIEMPRE deben reproducirse,
    // independientemente de la página donde estemos
    if (soundEvent === 'victoria') {
      const opciones = [victoria1, victoria2];
      let newIndex = Math.floor(Math.random() * opciones.length);
      
      src = opciones[newIndex];
      newTrack = `victoria_${newIndex}`;
      loop = false;
      console.log("Intentando reproducir sonido de victoria"); // Agregar log para depuración
    } else if (soundEvent === 'derrota') {
      src = derrota;
      newTrack = 'derrota';
      loop = false;
      console.log("Intentando reproducir sonido de derrota"); // Agregar log para depuración
    } else if (shouldPlayMusic()) {
      // Música del modo actual solo si estamos en una página de música
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
    }
    
    // IMPORTANTE: Siempre definir una fuente para eventos especiales
    if (src) {
      // Siempre detener el audio anterior para eventos especiales
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";  // Liberar recursos
        audioRef.current = null;
      }
      
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
          audioRef.current = null;
        };
      }
      
      // CRÍTICO: Asegurar que los eventos de victoria/derrota se reproduzcan
      console.log("Reproduciendo audio con src:", src);
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setCurrentTrack(newTrack);
          console.log("Audio reproducido correctamente");
        })
        .catch((err) => {
          console.warn("Error al reproducir audio:", err);
          
          // Posible solución alternativa si falla la reproducción automática
          if (soundEvent === 'victoria' || soundEvent === 'derrota') {
            // Intentar reproducir después de interacción del usuario
            console.log("Reintentando reproducción después de interacción");
            const playPromise = () => {
              audio.play()
                .then(() => {
                  setIsPlaying(true);
                  setCurrentTrack(newTrack);
                })
                .catch(e => console.error("Error en segundo intento:", e));
            };
            
            // Alternativa: Mostrar botón para reproducir manualmente
            document.addEventListener('click', function playOnce() {
              playPromise();
              document.removeEventListener('click', playOnce);
            }, {once: true});
          }
        });
      
      audioRef.current = audio;
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