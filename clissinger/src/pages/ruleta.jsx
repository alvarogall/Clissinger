import React, { useState } from "react";

function Ruleta() {
  const opciones = [
    "Premio 1",
    "Premio 2",
    "Premio 3",
    "Premio 4",
    "Premio 5",
    "Premio 6",
  ];

  const [rotacion, setRotacion] = useState(0);
  const [resultado, setResultado] = useState(null);

  const girarRuleta = () => {
    const vueltas = 5;
    const gradosExtra = 360 * vueltas;
    const anguloAleatorio = Math.floor(Math.random() * 360);
    const nuevaRotacion = rotacion + gradosExtra + anguloAleatorio;
    setRotacion(nuevaRotacion);

    const indice = Math.floor(((nuevaRotacion % 360) / 360) * opciones.length);
    const indiceReal = opciones.length - indice - 1;
    setTimeout(() => {
      setResultado(opciones[indiceReal]);
    }, 4000);
  };

  const contenedorStyle = {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #0d1b2a, #1b263b)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "sans-serif",
  };

  const tituloBarraStyle = {
    backgroundColor: "#1e3a8a",
    width: "100%",
    padding: "25px 0",
    textAlign: "center",
    marginBottom: "40px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
  };

  const tituloTextoStyle = {
    fontSize: "36px",
    fontWeight: "bold",
  };

  const ruletaContainer = {
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    border: "10px solid white",
    overflow: "hidden",
    position: "relative",
    marginBottom: "40px",
  };

  const ruletaStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    position: "absolute",
    top: 0,
    left: 0,
    transform: `rotate(${rotacion}deg)`,
    transition: "transform 4s cubic-bezier(0.33, 1, 0.68, 1)",
    background: `conic-gradient(
      #3b82f6 0% 16.66%,
      #60a5fa 16.66% 33.33%,
      #93c5fd 33.33% 50%,
      #2563eb 50% 66.66%,
      #1d4ed8 66.66% 83.33%,
      #1e40af 83.33% 100%
    )`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const textoOpcionStyle = (index) => {
    const angulo = (360 / opciones.length) * index; // Ángulo de cada opción
    return {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `rotate(${angulo}deg) translate(0, -42%) rotate(-${angulo}deg)`,
        transformOrigin: "center center",
        fontSize: "16px",
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        width: "80px",
        pointerEvents: "none",
    };
};
  const flechaStyle = {
    position: "absolute",
    top: "0", // Ajusta la posición para que quede debajo de la ruleta
    left: "50%",
    transform: "translateX(-50%)",
    width: "0",
    height: "0",
    borderLeft: "20px solid transparent",
    borderRight: "20px solid transparent",
    borderTop: "30px solid #facc15", // flecha amarilla apuntando hacia abajo
    zIndex: 10,
};

  const botonStyle = {
    backgroundColor: "#facc15",
    color: "#000",
    fontWeight: "bold",
    padding: "20px 40px",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
    fontSize: "24px",
    marginTop: "60px",
  };

  const resultadoStyle = {
    marginTop: "40px",
    fontSize: "22px",
    fontWeight: "bold",
    color: "#facc15",
  };

  return (
    <div style={contenedorStyle}>
      <div style={tituloBarraStyle}>
        <div style={tituloTextoStyle}>🎯 ¡Gira la ruleta!</div>
      </div>

      <div style={{ position: "relative", marginBottom: "20px" }}>
        {/* Flecha fija */}
        <div style={flechaStyle}></div>

        {/* Ruleta */}
        <div style={ruletaContainer}>
          <div style={ruletaStyle}>
            {opciones.map((opcion, index) => (
              <div key={index} style={textoOpcionStyle(index)}>
                {opcion}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button style={botonStyle} onClick={girarRuleta}>
        GIRAR
      </button>

      {resultado && <div style={resultadoStyle}>Resultado: {resultado}</div>}
    </div>
  );
}

export default Ruleta;
