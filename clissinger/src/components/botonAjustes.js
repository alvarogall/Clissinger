import React from "react";
import { useNavigate } from "react-router-dom";

const BotonAjustes = () => {
  const navigate = useNavigate();

  return (
    <button
      className="mt-8 px-6 py-3 text-lg font-semibold bg-white text-blue-950 rounded-full shadow-md hover:bg-gray-200 transition"
      onClick={() => navigate("/ajustes")}
    >
      AJUSTES
    </button>
  );
};

export default BotonAjustes;
