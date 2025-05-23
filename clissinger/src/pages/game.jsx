import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import BotonVolverAtrasMenu from "./../components/common/botonVolverAtrasMenu";
import BotonAjustes from "./../components/common/botonAjustes";
import lightBulb from "../images/lightbulb.svg";
import TutorialDriver from "../components/TutorialDriverGame";
import Layout from "../components/common/layout";
import Settings from "./settings";

function generateLetterOptions(answer, totalLetters = 12) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const upperAnswer = answer.toUpperCase().split("");

  const result = [...upperAnswer];
  while (result.length < totalLetters) {
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    result.push(randomLetter);
  }

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
  const mode = location.state?.mode || "normal";

  // Inicializa successCount correctamente para ruleta
  const initialAciertos =
    mode === "ruleta"
      ? Number(location.state?.aciertos ?? localStorage.getItem("aciertos") ?? 0)
      : 0;
  const [successCount, setSuccessCount] = useState(initialAciertos);

  const [levels, setLevels] = useState([]);
  const [usedLevelIds, setUsedLevelIds] = useState([]);
  const [levelData, setLevelData] = useState(null);
  const [nextLevelData, setNextLevelData] = useState(null);
  const [disabledIndexes, setDisabledIndexes] = useState(new Set());
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [hintCount, setHintCount] = useState(3);
  const [hintUsedForCurrentLevel, setHintUsedForCurrentLevel] = useState(false);
  const [timer, setTimer] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [failCount, setFailCount] = useState(0);

  const userId = localStorage.getItem("userID");
  const points = 50;

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await axios.get(`https://backend-woad-chi.vercel.app/api/levels?thematic=${thematic}`);
        setLevels(response.data);
      } catch (error) {
        console.error("Error al cargar niveles:", error);
      }
    };

    fetchLevels();
  }, []);

  useEffect(() => {
    if (levels.length === 0 || levelData !== null) return;

    const remainingLevels = levels.filter(
      (level) => !usedLevelIds.includes(level._id)
    );

    if (remainingLevels.length === 0) {
      navigate("/score/victoria", { state: { score: (successCount + 1) * points } });
      return;
    }

    const currentLevel = remainingLevels[Math.floor(Math.random() * remainingLevels.length)];
    setLevelData(currentLevel);
    setDisabledIndexes(new Set());
    setSelectedLetters([]);
    setHintUsedForCurrentLevel(false);
    setUsedLevelIds((prev) => [...prev, currentLevel._id]);

    const nextRemaining = remainingLevels.filter(l => l._id !== currentLevel._id);
    const preloadNext = nextRemaining[Math.floor(Math.random() * nextRemaining.length)];
    setNextLevelData(preloadNext || null);

    if (mode === "lightning") {
      const totalTime = remainingLevels.length * 10;
      setTimer(totalTime);
    }
  }, [levels, levelData, usedLevelIds]);

  useEffect(() => {
    if (mode !== "lightning" || timer === null) return;

    if (timer <= 0) {
      alert("⏱️ ¡Tiempo agotado!");
      navigate("/score/derrota");
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, mode]);

  const letterOptions = useMemo(() => {
    return levelData ? generateLetterOptions(levelData.word) : [];
  }, [levelData]);

  const handleLetterClick = (letter, index) => {
    if (disabledIndexes.has(index)) return;

    const newSelected = [...selectedLetters, letter];
    setSelectedLetters(newSelected);
    setDisabledIndexes(prev => {
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });

    if (newSelected.length === levelData.word.length) {
      const playerWord = newSelected.join("").toUpperCase();
      const correctWord = levelData.word.toUpperCase();

      setTimeout(() => {
        if (playerWord === correctWord) {
          setSuccessCount(prev => {
            const nuevosAciertos = prev + 1;

            if (mode === "ruleta") {
              localStorage.setItem("aciertos", nuevosAciertos);
              navigate("/ruleta");
            } else {
              axios.post("https://backend-woad-chi.vercel.app/api/user/add-points", {
                userId,
                points,
              });
              if (!nextLevelData) {
                navigate("/score/victoria", { state: { score: (successCount + 1) * points } });
                return;
              }
              setLevelData(nextLevelData);
              setDisabledIndexes(new Set());
              setSelectedLetters([]);
              setUsedLevelIds((prev) => [...prev, nextLevelData._id]);
              setHintUsedForCurrentLevel(false);
              const remainingAfterNext = levels.filter(l => !usedLevelIds.includes(l._id) && l._id !== nextLevelData._id);
              const preload = remainingAfterNext[Math.floor(Math.random() * remainingAfterNext.length)];
              setNextLevelData(preload || null);
            }

            return nuevosAciertos;
          });
        } else {
          if (mode === "ruleta") {
            localStorage.setItem("aciertos", 0);
            navigate("/ruleta");
          } else {
             setFailCount(prevFailCount => {
                const nuevosFallos = prevFailCount + 1;
                if (nuevosFallos >= 3) {
                  navigate("/score/derrota");
                }else{
                  setSelectedLetters([]);
                  setDisabledIndexes(new Set());
                  }
                return nuevosFallos;
              });
          }
        }

      }, 100);
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
      setHintCount(prev => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!levelData) return;
      let key = event.key;

      // Normaliza a mayúsculas y convierte ñ minúscula a Ñ
      if (key === "ñ") key = "Ñ";
      key = key.toUpperCase();

      // Backspace o Delete: borrar letra
      if (key === "BACKSPACE" || key === "DELETE") {
        event.preventDefault();
        handleDeleteLastLetter();
        return;
      }

      // Letras A-Z, Ñ y espacio
      if (/^[A-ZÑ ]$/.test(key)) {
        const idx = letterOptions.findIndex(
          (l, i) => l === key && !disabledIndexes.has(i)
        );
        if (idx !== -1) {
          event.preventDefault(); // Evita scroll con espacio
          handleLetterClick(key, idx);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [levelData, letterOptions, disabledIndexes, selectedLetters]);

  if (!levelData) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div>Cargando nivel...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="min-h-screen flex flex-col items-center p-4 pt-16 pb-10">
        {mode === "lightning" && timer !== null && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg z-50">
            ⏱️ Tiempo restante: {timer}s
          </div>
        )}

        <TutorialDriver />

        {/* Header */}
        <div className="absolute top-4 left-4 flex sm:flex-row items-start sm:items-center gap-2 sm:gap-4 max-w-full p-2 bg-opacity-50 rounded-md">
          <BotonVolverAtrasMenu onClick={props.onBackClick} />
          <div id="juego-aciertos" className="text-green-400 font-semibold text-lg">
         
          <span className="hidden sm:inline">
          {mode === "ruleta"
          ? `Aciertos: ${successCount}`
          : `Aciertos: ${successCount}/${levels.length}`}
        </span>
       
        <span className="inline sm:hidden">
        {mode === "ruleta"
          ? successCount
          : `${successCount}/${levels.length}`}
        </span>
        </div>
        <div id="juego-fallos" className="text-red-500 font-semibold text-lg">
            {mode !== "ruleta" && (
              <><span className="hidden sm:inline">{`Intentos: ${failCount}/3`}</span>
                <span className="inline sm:hidden">{`${failCount}/3`}</span></>)}
        </div>
        </div>

        <div id="juego-pista"
          className="absolute top-4 right-4 flex items-center gap-2">
          {hintCount > 0 ? (
            <>
              <img src={lightBulb} alt="Icono de pista" className="w-8 h-8 sm:w-[60px] sm:h-[60px]" />
              <button
                onClick={() => {
                  if (!hintUsedForCurrentLevel && levelData?.hint) {
                    alert(levelData.hint + "\n\n" + "Como ya has usado la pista no podrás usar más hasta el próximo nivel, ¡Suerte!");
                    handleHintUsed();
                    setHintUsedForCurrentLevel(true);
                  }
                }}
                disabled={hintUsedForCurrentLevel}
                className={`bg-[#1E3A8A] hover:bg-[#1B347C] font-bold  px-2 py-1 text-sm sm:px-4 sm:py-2.5 sm:text-xl rounded-xl flex items-center gap-3 shadow-md ${
                  hintUsedForCurrentLevel ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span className="uppercase tracking-wide">Pista</span>
                <span className="text-white text-lg sm:text-2xl font-bold">
                  {hintCount}
                </span>
              </button>
            </>
          ) : (
            <>
              <img src={lightBulb} alt="Icono de pista" className="sm:w-[60px] sm:h-[60px] opacity-50" />
              <div className="bg-gray-400 font-bold px-2 py-1 text-sm sm:px-4 sm:py-2.5 sm:text-xl rounded-xl flex items-center gap-3 shadow-md cursor-not-allowed">
                <span className="uppercase tracking-wide opacity-50">Pista</span>
                <span className="text-white text-lg sm:text-2xl font-bold">0</span>
              </div>
            </>
          )}
        </div>

        {/* Main content */}
        <div className="w-full max-w-2xl flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4 text-center px-4">
            ¿Qué palabra relaciona estas imágenes?
          </h1>

          <div id="juego-imagenes"
            className="grid grid-cols-2 gap-2 mb-4 w-full max-w-sm">
            {[levelData.image1, levelData.image2, levelData.image3, levelData.image4].map((img, idx) => (
              <div key={idx} className="aspect-square bg-gray-700 rounded-xl overflow-hidden shadow-lg">
                <img src={img} alt={`Imagen ${idx + 1}`} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>

          {/* Letras seleccionadas */}
          <div id="juego-rayas"
            className="text-yellow-400 text-3xl tracking-widest mb-8">
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
            <div id="juego-letras"
              className="grid grid-cols-6 gap-3 w-full max-w-md">
              {letterOptions.map((letter, i) => (
                <button aria-label={letter === " " ? "Espacio" : letter}
                  key={i}
                  onClick={() => handleLetterClick(letter, i)}
                  disabled={disabledIndexes.has(i)}
                  className={`font-bold p-3 rounded-lg text-lg ${
                    disabledIndexes.has(i)
                      ? "bg-gray-400 text-white"
                      : "bg-yellow-400 text-black hover:bg-yellow-500"
                  }`}
                >
                  
                {letter === " " ? "\u00A0" : letter}
                </button>
              ))}
            </div>

            {/* Botón borrar */}
            <button id="juego-borrar"
              onClick={handleDeleteLastLetter}
              className="bg-red-600 hover:bg-red-600 text-white font-bold p-3 rounded-lg text-lg"
            >
              ⌫ Borrar
            </button>
          </div>
        </div>
        
        <div>
          <BotonAjustes className="mt-10" onClick={() => setShowSettings(true)} />
        </div>

        {showSettings && (
          <Settings onClose={() => setShowSettings(false)} />
        )}
      </main>
    </Layout>
  );
}

export default Game;