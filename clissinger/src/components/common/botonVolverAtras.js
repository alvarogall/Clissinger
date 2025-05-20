import { useNavigate } from "react-router-dom";

const BotonVolverAtras = ({ to }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => to ? navigate(to) : navigate(-1)}
      className="text-lg font-semibold hover:underline"
    >
      ← Volver
    </button>
  );
};

export default BotonVolverAtras;
