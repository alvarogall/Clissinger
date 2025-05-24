import towerIcon from '../images/tower.svg'; // Icono para modo normal
import lightningIcon from '../images/lightning.svg'; // Icono para modo relámpago
import ruletaIcon from '../images/ruleta.svg';       // NUEVO: Icono para modo ruleta
import { useNavigate } from 'react-router-dom';
import BotonAjustes from "./../components/common/botonAjustes";
import BotonCerrarSesion from "./../components/common/botonCerrarSesion";

export default function GameModeDisplay({ selectedMode }) {
  const navigate = useNavigate();
  const iconSrc = selectedMode === 'normal' ? towerIcon : (selectedMode == 'ruleta' ? ruletaIcon : lightningIcon);

  const handlePlayClick = () => {
    console.log('Modo seleccionado:', selectedMode);
    if(selectedMode == 'ruleta'){
      navigate('/ruleta');
    }else{
      navigate('/tematicas', { state: { mode: selectedMode } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div id="inicio-jugar" className="flex flex-col items-center justify-center md-12">
        {/* Icono del modo */}
        <img
          key={iconSrc}
          src={iconSrc}
          alt="Icono del modo"
          className="w-44 h-44 mb-4 animate-fade-in-down"
        />

        {/* Botón jugar */}
        <button 
          onClick={handlePlayClick}
          className="px-10 py-5 bg-[#FFCF25] rounded-full text-white font-extrabold text-4xl uppercase hover:scale-95 active:scale-90 transition-transform drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
        >
          JUGAR
        </button>
      </div>
      {/* Botón de ajustes */}
      <div id="inicio-ajustes"
        className="fixed top-4 left-4 z-30">
        <BotonAjustes className="p-2 sm:p-3 sm:px-6 sm:py-3 " />
      </div>
      {/* Botón de cerrar sesión */}
      <div id="inicio-cerrar-sesion"
        className="fixed top-24 left-4 z-30">
        <BotonCerrarSesion className="p-2 sm:p-3 sm:px-6 sm:py-3" />
      </div>
    </div>
  );
}