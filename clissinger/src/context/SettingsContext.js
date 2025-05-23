import { createContext, useContext, useState, useEffect, useRef  } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();
  const audioRef = useRef(null);

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

  useEffect(() => {
      let src;
      let loop = true;
     
      if (soundEvent === 'victoria') {
        const opciones = [victoria1, victoria2];
        let newIndex;

        do {
          newIndex = Math.floor(Math.random() * opciones.length);
        } while (newIndex === lastSongIndexRef.current && opciones.length > 1);

        lastSongIndexRef.current = newIndex;
        src = opciones[newIndex];
        loop = false;
      } else if (soundEvent === 'derrota') {
       src = derrota;
       loop = false;
      } else {
        switch (mode) {
          case 'lightning':
            src = modoRayo;
            break;
          case 'ruleta':
            src = modoRuleta;
            break;
          case 'normal':
          default:
            src = modoNormal;
            break;
        }
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio(src);
      audio.volume = volume / 100;
      
      audio.play().catch((err) => console.warn('Error al reproducir audio', err));
      audioRef.current = audio;
      
      if (!loop) {
        audio.onended = () => {
          setSoundEvent(null); 
        };
      }

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }, [mode, soundEvent, volume]);

    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.volume = volume / 100;
      }
    }, [volume]);

    const stopAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
  };


  const saveSettings = ( newVolume, newDarkMode, newFontSize, newColorBlind) => {
    setVolume(newVolume);
    setDarkMode(newDarkMode);
    setFontSize(newFontSize);
    setColorBlind(newColorBlind);

    localStorage.setItem('volume', volume);
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
      saveSettings
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);