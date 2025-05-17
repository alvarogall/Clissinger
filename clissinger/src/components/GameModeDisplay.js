import towerIcon from '../images/tower.svg'; // Icono para modo normal
import lightningIcon from '../images/lightning.svg'; // Icono para modo relámpago
import { useNavigate } from 'react-router-dom';
import BotonAjustes from "./../components/common/botonAjustes";
import BotonCerrarSesion from "./../components/common/botonCerrarSesion";

export default function GameModeDisplay({ selectedMode }) {
  const navigate = useNavigate();
  const iconSrc = selectedMode === 'normal' ? towerIcon : lightningIcon;

  const handlePlayClick = () => {
    console.log('Modo seleccionado:', selectedMode);
    navigate('/tematicas', { state: { mode: selectedMode } }); // Redirigir a Tematicas.js
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div id ="inicio-jugar">
      {/* Icono del modo */}
      <img
        key={iconSrc} // Cambiará cada vez que cambie el modo
        src={iconSrc}
        alt="Icono del modo"
        className="w-64 h-64 opacity-0 translate-y-[-20px] animate-fade-in-down"
      />

      {/* Botón jugar */}
      <button 
        onClick={handlePlayClick}
        className="mt-6 px-12 py-4 bg-[#FFCF25] rounded-full text-white font-extrabold text-5xl uppercase hover:scale-95 active:scale-90 transition-transform"
      >
        JUGAR
      </button>
      </div>
      {/* Botón de ajustes */}
      <div id="inicio-ajustes"
      className="fixed top-4 left-4 z-30">
        <BotonAjustes className="p-2 sm:p-3 sm:px-6 sm:py-3 " />
      </div>
      
      {/* Botón de ajustes */}
      <div id="inicio-cerrar-sesion"
      className="fixed top-24 left-4 z-30">
        <BotonCerrarSesion className="p-2 sm:p-3 sm:px-6 sm:py-3" />
      </div>
    </div>
  );
}