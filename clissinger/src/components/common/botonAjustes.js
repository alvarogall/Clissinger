import screwiron from "../../images/screwiron.svg"; 
import { useNavigate } from "react-router-dom";

const BotonAjustes = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <button 
      className={`flex items-center justify-center bg-blue-500 text-white rounded-full shadow-md hover:scale-105 duration-300 p-3 sm:px-6 sm:py-3 font-semibold ${className}`}
      onClick={() => navigate("/ajustes")}
      aria-label="Ajustes"
    >
      <img src={screwiron} alt="Ajustes" className="w-7 h-7 sm:w-8 sm:h-8" />
      <span className="hidden sm:inline ml-2 text-lg font-bold">AJUSTES</span>
    </button>
    
  );
};

export default BotonAjustes;