import { Link } from "react-router-dom";

const BotonVolverAtrasInicio = () => {

  return (
    <Link
        to="/"
        className="text-lg font-semibold hover:underline"
      >
        ← Volver
      </Link>
  );
};

export default BotonVolverAtrasInicio;