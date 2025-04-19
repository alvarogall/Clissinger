// src/components/common/Layout.jsx
import React from 'react';
import { useSettings } from '../../context/SettingsContext';

const Layout = ({ children }) => {
  const { darkMode, fontSize } = useSettings();

  const getFontSize = () => {
    const sizes = ['0.75rem', '0.875rem', '1rem', '1.25rem', '1.5rem'];
    return sizes[fontSize];
  };

  return (
    <div
      className="min-h-screen transition-all duration-300 text-white"
      style={{
        background: darkMode
          ? 'linear-gradient(to bottom, #1e1e1e, #2e2e2e)'
          : 'linear-gradient(to bottom, #1e3a8a, #34d399)',
        fontSize: getFontSize(),
        color: darkMode ? '#fff' : '#000'
      }}
    >
      {children}
    </div>
  );
};

export default Layout;
