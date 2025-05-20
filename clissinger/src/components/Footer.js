import lightningIcon from '../images/lightning.svg';
import towerIcon from '../images/tower.svg';
import ruletaIcon from '../images/ruleta.svg';
import { useSettings } from '../context/SettingsContext';

export default function Footer({ selectedMode, setSelectedMode }) {
  const { darkMode } = useSettings();

  // Cambia el color de fondo del footer según el modo
  const footerBg = darkMode
  ? 'bg-black'        // Negro total para modo oscuro
  : 'bg-[#172554]';   // Azul oscuro para modo claro

  return (
    <div id="inicio-seleccion-modo" className="fixed bottom-0 w-full h-[150px]">
      {/* DIV INVISIBLE PARA EL TUTORIAL */}
      <div
        className={`fixed bottom-0 w-full ${footerBg} py-6 flex justify-around items-center gap-6 sm:gap-8`}
      >
        {/* Modo relámpago */}
        <div
          onClick={() => setSelectedMode('lightning')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-2 w-24 h-20 sm:w-60 sm:h-20 bg-blue-600 rounded-md cursor-pointer transition-transform ${
            selectedMode === 'lightning' ? 'translate-y-[-50%] scale-110' : ''
          } hover:scale-105`}
        >
          <img src={lightningIcon} alt="Modo relámpago" className="w-8 h-8" />
          <span className="hidden sm:inline text-white font-bold text-lg sm:text-xl">Modo Relámpago</span>
        </div>

        {/* Modo normal */}
        <div
          onClick={() => setSelectedMode('normal')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-2 w-24 h-20 sm:w-60 sm:h-20 bg-blue-600 rounded-md cursor-pointer transition-transform ${
            selectedMode === 'normal' ? 'translate-y-[-50%] scale-110' : ''
          } hover:scale-105`}
        >
          <img src={towerIcon} alt="Modo normal" className="w-8 h-8" />
          <span className="hidden sm:inline text-white font-bold text-lg sm:text-2xl">Modo Normal</span>
        </div>

        {/* Modo Ruleta */}
        <div
          onClick={() => setSelectedMode('ruleta')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-2 w-24 h-20 sm:w-60 sm:h-20 bg-blue-600 rounded-md cursor-pointer transition-transform ${
            selectedMode === 'ruleta' ? 'translate-y-[-50%] scale-110' : ''
          } hover:scale-105`}
        >
          <img src={ruletaIcon} alt="Modo ruleta" className="w-8 h-8" />
          <span className="hidden sm:inline text-white font-bold text-lg sm:text-2xl">Modo Ruleta</span>
        </div>
      </div>
    </div>
  );
}