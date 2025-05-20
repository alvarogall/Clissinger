// src/components/common/Layout.jsx
import { useSettings } from '../../context/SettingsContext';

const Layout = ({ children }) => {
  const { darkMode, fontSize, colorBlind } = useSettings();

  const getFontSize = () => {
    const sizes = ['0.75rem', '0.875rem', '1rem', '1.25rem', '1.5rem'];
    return sizes[fontSize];
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 text-white ${colorBlind ? "daltonic" : ""}`}
      style={{
        background: darkMode
          ? 'linear-gradient(to bottom, #1e1e1e, #2e2e2e)'
          : colorBlind
            ? 'linear-gradient(to bottom, #f7e600, #00a2e8)'
            : 'linear-gradient(to bottom, #172554, #3b82f6)',
        fontSize: getFontSize(),
        color: '#fff'
      }}
    >
      {children}
    </div>
  );
};

export default Layout;
