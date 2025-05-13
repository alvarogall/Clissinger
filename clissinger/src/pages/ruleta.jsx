import React, { useRef, useState } from "react";

const Ruleta = () => {
  const opciones = ["Banderas", "Deportes", "Historia", "Categoria 4", "Categoria 5", "Categoria 6"];
  const ruletaRef = useRef(null);
  const [girando, setGirando] = useState(false);
  const [resultado, setResultado] = useState(null);

  const girarRuleta = () => {
    if (girando) return;

    setResultado(null); // Oculta resultado anterior al girar

    const gradosPorOpcion = 360 / opciones.length;
    const indexGanador = Math.floor(Math.random() * opciones.length);
    const rotacionExtra = 360 * 5; // vueltas extra
    const rotacionFinal = rotacionExtra + (360 - indexGanador * gradosPorOpcion - gradosPorOpcion / 2);

    // Reseteamos la rotación para evitar acumulaciones
    ruletaRef.current.style.transition = "none";
    ruletaRef.current.style.transform = `rotate(0deg)`;

    // Forzamos el repaint antes de aplicar nueva rotación
    void ruletaRef.current.offsetWidth;

    // Aplicamos la rotación con transición
    ruletaRef.current.style.transition = "transform 4s ease-out";
    ruletaRef.current.style.transform = `rotate(${rotacionFinal}deg)`;

    setGirando(true);
    setTimeout(() => {
      setResultado(opciones[indexGanador]);
      setGirando(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-400 flex flex-col items-center justify-start py-12 text-white">
      <h1 className="text-4xl font-bold mb-10">🎉 Gira la Ruleta 🎉</h1>

      {/* Flecha */}
      <div className="relative w-[420px]">
        <div
          className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[30px] border-l-transparent border-r-transparent border-b-yellow-400 absolute top-0 left-1/2 -translate-x-1/2 z-10 rotate-180"
        ></div>

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
          <svg
            width="420"
            height="420"
            viewBox="0 0 420 420"
            className="absolute top-0 left-0 z-10"
          >
            <defs>
              {opciones.map((_, index) => {
                const radio = 170;
                const anguloInicio = (360 / opciones.length) * index;
                const anguloFinal = anguloInicio + 360 / opciones.length;
                const rad = (deg) => (deg * Math.PI) / 180;

                const x1 = 210 + radio * Math.cos(rad(anguloInicio - 90));
                const y1 = 210 + radio * Math.sin(rad(anguloInicio - 90));
                const x2 = 210 + radio * Math.cos(rad(anguloFinal - 90));
                const y2 = 210 + radio * Math.sin(rad(anguloFinal - 90));

                return (
                  <path
                    key={`path-${index}`}
                    id={`textPath-${index}`}
                    d={`M ${x1},${y1} A ${radio},${radio} 0 0,1 ${x2},${y2}`}
                    fill="none"
                  />
                );
              })}
            </defs>

            {opciones.map((opcion, index) => (
              <text key={index} fontSize="16" fill="white" fontWeight="bold">
                <textPath
                  href={`#textPath-${index}`}
                  startOffset="50%"
                  textAnchor="middle"
                >
                  {opcion}
                </textPath>
              </text>
            ))}
          </svg>
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

      {/* Resultado */}
      {resultado && (
        <h2 className="mt-6 text-2xl font-semibold">
          🎁 Te tocará responder una pregunta de: ¡<span className="underline">{resultado}</span>!
        </h2>
      )}
    </div>
  );
};

export default Ruleta;
