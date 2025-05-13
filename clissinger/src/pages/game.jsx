import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const thematic = location.state?.thematic || "GENERAL";

  const [levels, setLevels] = useState([]);
  const [usedLevelIds, setUsedLevelIds] = useState([]);
  const [levelData, setLevelData] = useState(null);
  const [letterOptions, setLetterOptions] = useState([]);
  const [disabledIndexes, setDisabledIndexes] = useState(new Set());
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [hintCount, setHintCount] = useState(3);
  const [hintUsedForCurrentLevel, setHintUsedForCurrentLevel] = useState(false);

  const userId = localStorage.getItem("userID");
  const points = 50;

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await axios.get(
          `https://backend-woad-chi.vercel.app/api/levels?thematic=${thematic}`
        );

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

  useEffect(() => {
    if (levels.length === 0 || levelData !== null) return;

    const remainingLevels = levels.filter(
      (level) => !usedLevelIds.includes(level._id)
    );

    if (remainingLevels.length === 0) {
      alert("🎉 ¡Has completado todos los niveles!");
      navigate("/");
      return;
    }

    const randomLevel =
      remainingLevels[Math.floor(Math.random() * remainingLevels.length)];

    setLevelData(randomLevel);
    setLetterOptions(generateLetterOptions(randomLevel.word));
    setDisabledIndexes(new Set());
    setSelectedLetters([]);
    setHintUsedForCurrentLevel(false);
    setUsedLevelIds((prev) => [...prev, randomLevel._id]);
  }, [levels, levelData, usedLevelIds]);

  const handleLetterClick = (letter, index) => {
    if (disabledIndexes.has(index)) return;

    const newSelected = [...selectedLetters, letter];
    setSelectedLetters(newSelected);
    setDisabledIndexes(new Set(disabledIndexes).add(index));

    if (newSelected.length === levelData.word.length) {
      const playerWord = newSelected.join("").toUpperCase();
      const correctWord = levelData.word.toUpperCase();

      setTimeout(async () => {
        if (playerWord === correctWord) {
          console.log("Palabra correcta:", userId);
          console.log("Palabra correcta:", points);
          await axios.post(
            "https://backend-woad-chi.vercel.app/api/user/add-points",
            {
              userId: userId,
              points: points,
            }
          );

          const remainingLevels = levels.filter(
            (level) => !usedLevelIds.includes(level._id)
          );

          if (remainingLevels.length === 0) {
            alert("🎉 ¡Has completado todos los niveles de esta temática!");
            navigate("/jugar");
            return;
          }

          const nextLevel =
            remainingLevels[
              Math.floor(Math.random() * remainingLevels.length)
            ];

          setLevelData(nextLevel);
          setLetterOptions(generateLetterOptions(nextLevel.word));
          setDisabledIndexes(new Set());
          setSelectedLetters([]);
          setUsedLevelIds((prev) => [...prev, nextLevel._id]);
          setHintUsedForCurrentLevel(false);
        } else {
          navigate("/score/derrota");
        }
      }, 1000);
    }
  };

  const handleDeleteLastLetter = () => {
    if (selectedLetters.length === 0) return;

    const newSelected = selectedLetters.slice(0, -1);
    setSelectedLetters(newSelected);

    const updatedIndexes = Array.from(disabledIndexes);
    updatedIndexes.pop();
    setDisabledIndexes(new Set(updatedIndexes));
  };

  const handleHintUsed = () => {
    if (hintCount > 0) {
      setHintCount((prevCount) => prevCount - 1);
    }
  };

  if (!levelData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#172852] to-[#2a5298] text-white flex items-center justify-center">
        <div>Cargando nivel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#172852] to-[#2a5298] text-white flex flex-col items-center p-2 sm:p-4 pt-16 sm:pt-20 pb-8 sm:pb-10">
      {/* Header */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex items-center gap-2 sm:gap-4">
        <BotonVolverAtrasMenu />
        <div className="text-green-400 font-semibold text-base sm:text-lg">
          Aciertos: {props.level || 1}/20
        </div>
      </div>

      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1 sm:gap-2">
        {hintCount > 0 ? (
          <>
            <img
              src={lightBulb}
              alt="Icono de pista"
              className="w-8 h-8 sm:w-[60px] sm:h-[60px]"
            />
            <button
              onClick={() => {
                if (!hintUsedForCurrentLevel && levelData?.hint) {
                  alert(
                    levelData.hint +
                      "\n\n" +
                      "Como ya has usado la pista no podrás usar más hasta el próximo nivel, ¡Suerte!"
                  );
                  handleHintUsed();
                  setHintUsedForCurrentLevel(true);
                }
              }}
              disabled={hintUsedForCurrentLevel}
              className={`bg-yellow-200 hover:bg-yellow-300 font-bold px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-base sm:text-xl flex items-center gap-2 sm:gap-3 shadow-md ${
                hintUsedForCurrentLevel
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <span className="uppercase tracking-wide">Pista</span>
              <span className="text-white text-xl sm:text-2xl font-bold">
                {hintCount}
              </span>
            </button>
            {/* Ajustes a la derecha de pista SOLO en móvil */}
            <span className="flex sm:hidden">
              <BotonAjustes />
            </span>
          </>
        ) : (
          <>
            <img
              src={lightBulb}
              alt="Icono de pista"
              className="w-8 h-8 sm:w-[60px] sm:h-[60px] opacity-50"
            />
            <div className="bg-gray-400 font-bold px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-base sm:text-xl flex items-center gap-2 sm:gap-3 shadow-md cursor-not-allowed">
              <span className="uppercase tracking-wide opacity-50">Pista</span>
              <span className="text-white text-xl sm:text-2xl font-bold">
                0
              </span>
            </div>
            {/* Ajustes a la derecha de pista SOLO en móvil 
            <span className="flex sm:hidden">
              <BotonAjustes />
            </span>
            */}
          </>
        )}
      </div>

      {/* Main content */}
      <div className="w-full max-w-lg sm:max-w-2xl flex flex-col items-center">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center px-2 sm:px-4">
          ¿Qué palabra relaciona estas imágenes?
        </h1>

        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 w-full max-w-xs sm:max-w-sm">
          {[levelData.image1, levelData.image2, levelData.image3, levelData.image4].map(
            (img, idx) => (
              <div
                key={idx}
                className="aspect-square bg-gray-700 rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-lg"
              >
                <img
                  src={img}
                  alt={`Imagen ${idx + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            )
          )}
        </div>

        {/* Letras seleccionadas */}
        <div className="text-yellow-400 text-2xl sm:text-3xl tracking-widest mb-6 sm:mb-8">
          {levelData.word.split("").map((_, idx) => (
            <span
              key={idx}
              className="inline-block border-b-2 border-yellow-400 w-4 sm:w-5 mx-0.5 sm:mx-1"
            >
              {selectedLetters[idx] || "\u00A0"}
            </span>
          ))}
        </div>

        {/* Zona de letras y botón borrar */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 w-full">
          {/* Letras */}
          <div className="grid grid-cols-6 gap-1 sm:gap-3 w-full max-w-xs sm:max-w-md">
            {letterOptions.map((letter, i) => (
              <button
                key={i}
                onClick={() => handleLetterClick(letter, i)}
                disabled={disabledIndexes.has(i)}
                className={`font-bold p-2 sm:p-3 rounded text-base sm:text-lg ${
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
            className="bg-red-500 hover:bg-red-600 text-white font-bold p-2 sm:p-3 rounded text-base sm:text-lg w-full sm:w-auto mt-2 sm:mt-0"
          >
            ⌫ Borrar
          </button>
        </div>
      </div>

      {/* Ajustes abajo a la derecha SOLO en escritorio 
      <div className="hidden sm:block fixed bottom-4 right-4 z-30">
        <BotonAjustes />
      </div>
      */}
    </div>
  );
}

export default Game;