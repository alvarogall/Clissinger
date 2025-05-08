import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BotonVolverAtrasMenu from "./../components/common/botonVolverAtrasMenu";
import BotonAjustes from "./../components/common/botonAjustes";
import lightBulb from "../images/lightbulb.svg";

// Función para generar letras aleatorias
function generateLetterOptions(answer, totalLetters = 12) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const upperAnswer = answer.toUpperCase().split("");

  const result = [...upperAnswer];
  while (result.length < totalLetters) {
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    result.push(randomLetter);
  }

  // Mezclar el array
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function Game(props) {
  const navigate = useNavigate();

  const [levels, setLevels] = useState([]);
  const [usedLevelIds, setUsedLevelIds] = useState([]);
  const [levelData, setLevelData] = useState(null);
  const [letterOptions, setLetterOptions] = useState([]);
  const [disabledIndexes, setDisabledIndexes] = useState(new Set());
  const [selectedLetters, setSelectedLetters] = useState([]);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await axios.get("https://backend-woad-chi.vercel.app/api/levels"); // <-- cambia esto
        setLevels(response.data);
      } catch (error) {
        console.error("Error al cargar niveles:", error);
      }
    };

    fetchLevels();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();
  
      if (key === "BACKSPACE") {
        handleDeleteLastLetter();
        return;
      }
  
      const letterIndex = letterOptions.findIndex(
        (letter, i) => letter === key && !disabledIndexes.has(i)
      );
  
      if (letterIndex !== -1) {
        handleLetterClick(key, letterIndex);
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [letterOptions, disabledIndexes, selectedLetters]);
  

  // // Selecciona un nuevo nivel no repetido
  // useEffect(() => {
  //   if (levels.length > 0) {
  //     const remainingLevels = levels.filter(
  //       (level) => !usedLevelIds.includes(level._id)
  //     );

  //     if (remainingLevels.length === 0) {
  //       alert("🎉 ¡Has completado todos los niveles!");
  //       return;
  //     }

  //     const randomLevel =
  //       remainingLevels[Math.floor(Math.random() * remainingLevels.length)];

  //     setLevelData(randomLevel);
  //     setLetterOptions(generateLetterOptions(randomLevel.word));
  //     setDisabledIndexes(new Set());
  //     setSelectedLetters([]);
  //     setUsedLevelIds([...usedLevelIds, randomLevel._id]);
  //   }
  // }, [levels, usedLevelIds]);

  const handleLetterClick = (letter, index) => {
    if (disabledIndexes.has(index)) return;

    const newSelected = [...selectedLetters, letter];
    setSelectedLetters(newSelected);
    setDisabledIndexes(new Set(disabledIndexes).add(index));

    if (newSelected.length === levelData.word.length) {
      const playerWord = newSelected.join("").toUpperCase();
      const correctWord = levelData.word.toUpperCase();

      setTimeout(() => {
        if (playerWord === correctWord) {
          navigate("/score/victoria");
        } else {
          navigate("/score/derrota");
        }
      }, 1000);
    }
  };

  const handleDeleteLastLetter = () => {
    if (selectedLetters.length === 0) return;

    const lastLetter = selectedLetters[selectedLetters.length - 1];
    const newSelected = selectedLetters.slice(0, -1);
    setSelectedLetters(newSelected);

    // Rehabilitar el último botón deshabilitado (último index usado)
    const updatedIndexes = Array.from(disabledIndexes);
    updatedIndexes.pop();
    setDisabledIndexes(new Set(updatedIndexes));
  };

  const handleScore = (resultado) => {
    navigate(`/score/${resultado}`);
  };

  if (!levelData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#172852] to-[#2a5298] text-white flex items-center justify-center">
        <div>Cargando nivel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#172852] to-[#2a5298] text-white flex flex-col items-center p-4 pt-16 pb-10">
      {/* Header */}
      <div className="absolute top-4 left-4 flex items-center gap-4">
        <BotonVolverAtrasMenu onClick={props.onBackClick} />
        <div className="text-green-400 font-semibold text-lg">
          Aciertos: {props.level || 1}/20
        </div>
      </div>

      <div className="absolute top-4 right-4">
        <button
          onClick={props.onHintClick}
          className="bg-yellow-200 hover:bg-yellow-300 font-bold px-4 py-2.5 rounded-xl text-xl flex items-center gap-3 shadow-md"
        >
          <img src={lightBulb} alt="Icono de pista" className="w-8 h-8" />
          <span className="uppercase tracking-wide">Pista</span>
          <span className="text-white text-2xl font-bold">
            {props.hintCost || 0}
          </span>
        </button>
      </div>

      {/* Main content */}
      <div className="w-full max-w-2xl flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 text-center px-4">
          ¿Qué palabra relaciona estas imágenes?
        </h1>

        <div className="grid grid-cols-2 gap-6 mb-8 w-full max-w-lg">
          {[levelData.image1, levelData.image2, levelData.image3, levelData.image4].map((img, idx) => (
            <div key={idx} className="aspect-square bg-gray-700 rounded-xl overflow-hidden shadow-lg">
              <img src={img} alt={`Imagen ${idx + 1}`} className="object-cover w-full h-full" />
            </div>
          ))}
        </div>


        {/* Letras seleccionadas */}
        <div className="text-yellow-400 text-3xl tracking-widest mb-8">
          {levelData.word.split("").map((_, idx) => (
            <span
              key={idx}
              className="inline-block border-b-2 border-yellow-400 w-5 mx-1"
            >
              {selectedLetters[idx] || "\u00A0"}
            </span>
          ))}
        </div>

        {/* Zona de letras y botón borrar */}
        <div className="flex justify-center items-center gap-4">
          

          {/* Letras */}
          <div className="grid grid-cols-6 gap-3 w-full max-w-md">
            {letterOptions.map((letter, i) => (
              <button
                key={i}
                onClick={() => handleLetterClick(letter, i)}
                disabled={disabledIndexes.has(i)}
                className={`font-bold p-3 rounded-lg text-lg ${
                  disabledIndexes.has(i)
                    ? "bg-gray-400 text-white"
                    : "bg-yellow-400 text-black hover:bg-yellow-500"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>


          {/* Botón borrar */}
          <button
            onClick={handleDeleteLastLetter}
            className="bg-red-500 hover:bg-red-600 text-white font-bold p-3 rounded-lg text-lg"
          >
            ⌫ Borrar
          </button>

        </div>
      </div>

      <div>
        <BotonAjustes className="mt-10" />
      </div>

      {/* Botones debug */}
      {/* <div className="absolute bottom-4 -translate-x-3/4">
        <button
          onClick={() => handleScore("victoria")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded"
        >
          Puntuación Exitosa
        </button>
      </div>
      <div className="absolute bottom-4 translate-x-3/4">
        <button
          onClick={() => handleScore("derrota")}
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded"
        >
          Puntuación Fallida
        </button>
      </div> */}
    </div>
  );
}

export default Game;
