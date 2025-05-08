import React from "react";
import BotonVolverAtrasMenu from "./common/botonVolverAtrasMenu";
import BotonAjustes from "./common/botonAjustes";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Quiz = ({
  question = "Pregunta a insertar",
  level = 1,
  hintCost = 0,
  image1 = "",
  image2 = "",
  image3 = "",
  image4 = "",
  letterOptions = [],
  answer = [],
  correctAnswer = "",
  onLetterClick = () => {},
  onHintClick = () => {},
  onBackClick = () => {},
}) => {
  const navigate = useNavigate();

  const handleScore = (resultado) => {
    navigate(`/score/${resultado}`);

    
  };

  return (
    <div className="min-h-screen bg-[#11224D] text-white flex flex-col items-center p-4 pt-10 pb-10">
      {/* Header */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6 px-4">
        <BotonVolverAtrasMenu onClick={onBackClick} />
        <div className="text-white font-semibold text-xl">Racha {level}</div>
        <button
          onClick={onHintClick}
          className="flex items-center gap-2 bg-transparent text-yellow-400 font-bold text-lg"
        >
          <span>🔑 Pista</span>
          <span className="text-white">{hintCost}</span>
        </button>
      </div>

      {/* Main content */}
      <div className="w-full max-w-2xl flex flex-col items-center">
        {/* Imagenes */}
        <div className="grid grid-cols-2 gap-3 mb-6 w-full max-w-xs">
          {[image1, image2, image3, image4].map((img, idx) =>
            img ? (
              <div
                key={idx}
                className="aspect-square bg-gray-700 rounded-lg overflow-hidden"
              >
                <img
                  src={img}
                  alt={`Imagen ${idx + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div
                key={idx}
                className="aspect-square bg-gray-700 rounded-lg"
              />
            )
          )}
        </div>

        {/* Respuesta */}
        <div className="flex justify-center gap-x-2 text-yellow-400 text-2xl font-bold mb-6">
          {answer.map((letter, i) => (
            <div
              key={i}
              className="border-b-2 border-yellow-400 w-6 text-center"
            >
              {letter || "\u00A0"}
            </div>
          ))}
        </div>

        {/* Letras */}
        <div className="grid grid-cols-6 gap-3 w-full max-w-md mb-6">
          {letterOptions.map((letter, i) => (
            <button
              key={i}
              onClick={() => onLetterClick(letter)}
              className="bg-yellow-400 shadow-md rounded-full w-10 h-10 flex items-center justify-center text-black font-bold text-lg hover:bg-yellow-500 transition"
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Botones para testear resultado */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
        <button
          onClick={() => handleScore("victoria")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded"
        >
          Puntuación Exitosa
        </button>
        <button
          onClick={() => handleScore("derrota")}
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded"
        >
          Puntuación Fallida
        </button>
      </div>
    </div>
  );
};

export default Quiz;
