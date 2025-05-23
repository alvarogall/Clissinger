import ButtonOFF from "../../images/buttonOFF.svg"; 
import { useNavigate } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext"; 

const BotonCerrarSesion = ({ className = "" }) => {
  const navigate = useNavigate();
  const { stopAudio } = useSettings();

  const handleLogout = () => {

     stopAudio();
    // Limpia el almacenamiento local o cualquier dato relacionado con la sesión
    localStorage.removeItem("userID");
    localStorage.removeItem("authToken");

    // Redirige al usuario a la página de inicio de sesión
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center justify-center bg-red-500 text-white rounded-full shadow-md hover:scale-105 duration-300 p-3 sm:px-6 sm:py-3 font-semibold ${className}`}
    >
      <img src={ButtonOFF} alt="Ajustes" className="w-7 h-7 sm:w-8 sm:h-8" />
      <span className="hidden sm:inline ml-2 text-lg font-bold">CERRAR SESIÓN</span>
    </button>
  );
};

export default BotonCerrarSesion;