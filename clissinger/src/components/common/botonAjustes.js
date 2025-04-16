import React from "react";
import screwiron from "../../images/screwiron.svg"; 
import { useNavigate } from "react-router-dom";

const BotonAjustes = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      className= {`absolute top-6 left-6 px-6 py-3 font-semibold bg-blue-500 text-white rounded-md shadow-md hover:scale-105 duration-300 ${className}`}
      onClick={() => navigate("/ajustes")}
    >
    <p className="text-lg font-bold flex items-center">
      <img src={screwiron} alt="Imagen izquierda del botón" className="mr-2 w-8 h-8" />
      AJUSTES</p>              
      
    </button>
  );
};

export default BotonAjustes;
