import { Link } from "react-router-dom";

const BotonVolverAtrasMenu = () => {

  return (
    <Link
        to="/jugar"
        className="text-lg font-semibold hover:underline"
      >
        ← Volver
      </Link>
  );
};

export default BotonVolverAtrasMenu;