import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(2);
  const [colorBlind, setColorBlind] = useState(false);
  const [volume, setVolume] = useState(50);  

  const navigate = useNavigate();

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

  const saveSettings = ( newVolume, newDarkMode, newFontSize, newColorBlind) => {
    setVolume(newVolume);
    setDarkMode(newDarkMode);
    setFontSize(newFontSize);
    setColorBlind(newColorBlind);

    localStorage.setItem('volume', volume);
    localStorage.setItem('darkMode', newDarkMode);
    localStorage.setItem('fontSize', newFontSize);
    localStorage.setItem('colorBlind', newColorBlind);
    navigate("/jugar");
  };

  return (
    <SettingsContext.Provider value={{
      darkMode, setDarkMode,
      fontSize, setFontSize,
      colorBlind, setColorBlind,
      volume, setVolume,
      saveSettings
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);