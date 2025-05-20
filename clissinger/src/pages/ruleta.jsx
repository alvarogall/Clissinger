import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from '../components/common/layout';
import BotonVolverAtrasMenu from "../components/common/botonVolverAtrasMenu";

const Ruleta = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const opciones = [
    "banderas",    // PAÍSES
    "deportes",
    "historia",
    "videojuegos",
    "series",
    "peliculas"
  ];

  const nombresVisuales = {
    banderas: "PAÍSES",
    deportes: "DEPORTES",
    historia: "HISTORIA",
    videojuegos: "VIDEOJUEGOS",
    series: "SERIES",
    peliculas: "PELICULAS"
  };

  const ruletaRef = useRef(null);
  const [girando, setGirando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [aciertos, setAciertos] = useState(0);

  // Actualiza aciertos cada vez que vuelvas a la ruleta
  useEffect(() => {
    const aciertosGuardados = parseInt(localStorage.getItem("aciertos") || "0", 10);
    setAciertos(aciertosGuardados);
  }, [location]);

  const girarRuleta = () => {
    if (girando) return;
    setResultado(null);
    setGirando(true);

    const grados = 360 * 5 + Math.floor(Math.random() * 360);
    if (ruletaRef.current) {
      ruletaRef.current.style.transition = "transform 3s cubic-bezier(0.33, 1, 0.68, 1)";
      ruletaRef.current.style.transform = `rotate(${grados}deg)`;
    }

    setTimeout(() => {
      const gradosFinal = grados % 360;
      const anglePerSector = 360 / opciones.length;
      let sector = Math.floor(((360 - gradosFinal) % 360) / anglePerSector);
      if (sector < 0) sector += opciones.length;
      const resultadoFinal = opciones[sector];
      setResultado(resultadoFinal);
      setGirando(false);

      // Navega al juego pasando la racha de aciertos
      navigate("/juego", {
        state: {
          thematic: resultadoFinal,
          aciertos: aciertos,
          mode: "ruleta"
        }
      });
    }, 3200);
  };

  return (
    <Layout>
      <div className="flex absolute top-5 left-5">
        <BotonVolverAtrasMenu />
      </div>

      <div className="min-h-screen flex flex-col items-center justify-start py-12">
        <h1 className="text-4xl font-bold mb-4">🎉 Gira la Ruleta 🎉</h1>
        <p className="text-xl font-semibold mb-6">🔥 Aciertos seguidos: {aciertos}</p>

        {/* Flecha */}
        <div className="relative w-[420px]">
          <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[30px] border-l-transparent border-r-transparent border-b-yellow-400 absolute top-0 left-1/2 -translate-x-1/2 z-10 rotate-180"></div>

          {/* Ruleta */}
          <div
            ref={ruletaRef}
            className="w-[420px] h-[420px] rounded-full border-[10px] border-white relative shadow-xl mx-auto"
            style={{
              background: `conic-gradient(
                #3b82f6 0% 16.666%,
                #60a5fa 16.666% 33.333%,
                #93c5fd 33.333% 50%,
                #2563eb 50% 66.666%,
                #1d4ed8 66.666% 83.333%,
                #1e40af 83.333% 100%
              )`,
            }}
          >
            {opciones.map((opcion, index) => {
              const anglePerSector = 360 / opciones.length;
              const angle = anglePerSector * index + anglePerSector / 2;

              return (
                <div
                  key={index}
                  className="absolute left-1/2 top-1/2 text-white font-bold text-[14px] text-center"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-50%) translateY(-155px) rotate(-${angle}deg)`,
                    transformOrigin: "center",
                    width: "100px",
                    marginLeft: "-50px",
                    pointerEvents: "none",
                  }}
                >
                  {nombresVisuales[opcion]}
                </div>
              );
            })}
          </div>
        </div>

        {/* Botón */}
        <button
          onClick={girarRuleta}
          disabled={girando}
          className="mt-10 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-6 rounded disabled:opacity-50"
        >
          {girando ? "Girando..." : "Girar"}
        </button>

        {/* Resultado (opcional, si quieres mostrarlo antes de navegar) */}
        {resultado && (
          <div className="mt-8 text-2xl font-bold text-blue-700">
            ¡Te ha tocado: <span className="underline">{nombresVisuales[resultado]}</span>!
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Ruleta;