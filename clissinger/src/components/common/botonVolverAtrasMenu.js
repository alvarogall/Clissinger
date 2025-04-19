import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const BotonVolverAtras = () => {
  const navigate = useNavigate();

  return (
    <Link
        to="/jugar"
        className="text-lg font-semibold hover:underline"
      >
        ← Volver
      </Link>
  );
};

export default BotonVolverAtras;
