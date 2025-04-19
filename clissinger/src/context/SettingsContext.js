import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    const storedFontSize = localStorage.getItem('fontSize');

    if (storedDarkMode !== null) setDarkMode(storedDarkMode === 'true');
    if (storedFontSize !== null) setFontSize(Number(storedFontSize));
  }, []);

  const saveSettings = (newDarkMode, newFontSize) => {
    setDarkMode(newDarkMode);
    setFontSize(newFontSize);
    localStorage.setItem('darkMode', newDarkMode);
    localStorage.setItem('fontSize', newFontSize);
    navigate("/jugar")
  };

  return (
    <SettingsContext.Provider
      value={{ darkMode, setDarkMode, fontSize, setFontSize, saveSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
