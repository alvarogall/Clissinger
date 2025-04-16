import React from "react";
import BotonVolverAtras from "./common/botonVolverAtras";
import BotonAjustes from "./common/botonAjustes";

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
  onLetterClick = () => {},
  onHintClick = () => {},
  onBackClick = () => {},
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#172852] to-[#2a5298] text-white flex flex-col items-center p-4 pt-16 pb-10">
      {/* Header section */}
      <div className="absolute top-4 left-4 flex items-center gap-4">
        {/* <button
          onClick={onBackClick}
          className="bg-white hover:bg-gray-200 rounded-full p-2 text-xl text-black"
        >
          ❌
        </button> */}
        <BotonVolverAtras onClick={onBackClick} />
        <div className="text-green-400 font-semibold text-lg">Aciertos: {level}/20</div>
      </div>

      <div className="absolute top-4 right-4">
        <button
          onClick={onHintClick}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-3 py-1 rounded text-sm"
        >
          Pista ({hintCost})
        </button>
      </div>

      {/* Main content */}
      <div className="w-full max-w-2xl flex flex-col items-center">
        {/* Question */}
        <h1 className="text-2xl font-bold mb-4 text-center px-4">{question}</h1>
        
        {/* Image grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 w-full max-w-xs">
          <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
            <img src={image1} alt="Imagen 1" className="object-cover w-full h-full" />
          </div>
          <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
            <img src={image2} alt="Imagen 2" className="object-cover w-full h-full" />
          </div>
          <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
            <img src={image3} alt="Imagen 3" className="object-cover w-full h-full" />
          </div>
          <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
            <img src={image4} alt="Imagen 4" className="object-cover w-full h-full" />
          </div>
        </div>

        {/* Answer display */}
        <div className="text-yellow-400 text-xl tracking-widest mb-6">
          {answer.map((letter, i) => (
            <span
              key={i}
              className="inline-block border-b-2 border-yellow-400 w-5 mx-1"
            >
              {letter || "\u00A0"}
            </span>
          ))}
        </div>
        
        {/* Keyboard */}
        <div className="grid grid-cols-6 gap-2 w-full max-w-md">
          {letterOptions.map((letter, i) => (
            <button
              key={i}
              onClick={() => onLetterClick(letter)}
              className="bg-yellow-400 text-black font-bold hover:bg-yellow-500 p-1 rounded text-sm"
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
      <div>
        <BotonAjustes className = "mt-10"/>
      </div>
    </div>
  );
};

export default Quiz;