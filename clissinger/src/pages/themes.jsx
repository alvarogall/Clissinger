import Layout from '../components/common/layout';
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import lock from '../images/lock.svg';
import iconspain from '../images/iconspain.svg';
import videojuegos from '../images/mandoicono.svg';
import peliculas from '../images/peliculasicono.svg';
import series from '../images/seriesicono.svg';
import trophy from '../images/trophy.svg';
import history from '../images/history.svg';
import point from '../images/point.svg';
import BotonVolverAtrasMenu from "./../components/common/botonVolverAtrasMenu";
import PointsDisplay from '../components/PointsDisplay';

import { agregarTematicaDesbloqueada, getTematicasDesbloqueadas } from '../components/utils/TematicasCompradas';
import TutorialDriver from '../components/TutorialDriverThemes';


function Themes() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || "normal";

  //PRUEBA DESBLOQUEO TEMATICAS
  const userID = localStorage.getItem("userID");
  const [puntos, setPoints] = useState(0);
  const [tematicasDesbloqueadas, setTematicasDesbloqueadas] = useState(() => {
  const stored = localStorage.getItem("tematicas_desbloqueadas");
  return stored ? JSON.parse(stored) : [];}); 
  const fetchPoints = async () => {
    try {
      const res = await fetch(`https://backend-woad-chi.vercel.app/api/user/${userID}`);
      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.message);
      setPoints(data.user.points);
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  };
  useEffect(() => {
    fetchPoints();
  }, []);

  const desbloquearTematica = async (nombre, coste) => {
    if (puntos >= coste) {
      const confirmacion = window.confirm(`¿Gastar ${coste} puntos para desbloquear "${nombre.toUpperCase()}"?`);
      if (!confirmacion) return;

      try {
        const res = await fetch("https://backend-woad-chi.vercel.app/api/user/add-points", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userID,
            points: -coste,
          }),
        });

        if (!res.ok) throw new Error("Error al actualizar usuario en backend");

        const nuevosPuntos = puntos - coste;
        setPoints(nuevosPuntos);

        const nuevasTematicas = agregarTematicaDesbloqueada(nombre);
        setTematicasDesbloqueadas(nuevasTematicas); //GUARDA TEMATICAS LOCALMENTE-APAÑO TEMPORAL
        localStorage.setItem("tematicas_desbloqueadas", JSON.stringify(nuevasTematicas));

        alert(`¡"${nombre.toUpperCase()}" desbloqueado!`);
      } catch (error) {
        console.error("Error restando puntos:", error);
        alert("Hubo un error al restar los puntos. Intenta de nuevo.");
      }
    } else {
      alert("No tienes suficientes puntos.");
    }
  };

  const handle = (thematic) => {
    navigate('/juego', { state: { thematic, mode } });
  };

  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen relative px-2 sm:px-0">
        {/* Botón Volver Atrás */}
        <div className="absolute top-4 left-4 z-30">
          <BotonVolverAtrasMenu />
        </div>

        {/* Puntos */}
        <PointsDisplay points={puntos} />

        <TutorialDriver tematicasDesbloqueadas={tematicasDesbloqueadas} />

        <div className="w-full bg-blue-500 min-h-16 sm:min-h-20 absolute top-[7%] sm:top-[11%] text-center text-3xl sm:text-5xl font-bold text-white py-4 sm:py-6">
          <h1>SELECCIONA UNA TEMÁTICA</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-16 sm:gap-y-32 gap-x-4 sm:gap-x-0 w-full sm:w-[60%] place-items-center mt-28 sm:mt-24 px-2">
          <div className="flex flex-col items-center">
            <button id="tema-paises"
              onClick={() => handle('banderas')}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-800 hover:bg-blue-700 rounded-xl shadow-lg grid place-items-center"
            >
              <img src={iconspain} alt="Imagen de Bandera Española" className="w-12 h-12 sm:w-16 sm:h-16" />
            </button>
            <h2 className="text-base sm:text-lg font-bold mt-2 sm:mt-3">PAÍSES</h2>
          </div>

          <div className="flex flex-col items-center">
            <button id="tema-deportes"
              onClick={() => handle('deportes')}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-800 hover:bg-blue-700 rounded-xl shadow-lg grid place-items-center"
            >
              <img src={trophy} alt="Trofeo de campeonato" className="w-12 h-12 sm:w-16 sm:h-16" />
            </button>
            <h2 className="text-base sm:text-lg font-bold mt-2 sm:mt-3">DEPORTES</h2>
          </div>

          <div className="flex flex-col items-center">
            <button id="tema-historia"
              onClick={() => handle('historia')}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-800 hover:bg-blue-700 rounded-xl shadow-lg grid place-items-center"
            >
              <img src={history} alt="Papiros y jarrones antiguos" className="w-12 h-12 sm:w-16 sm:h-16" />
            </button>
            <h2 className="text-base sm:text-lg font-bold mt-2 sm:mt-3">HISTORIA</h2>
          </div>

          {/* TEMATICAS BLOQUEADAS */}
          <div className="flex flex-col items-center">
            <button id={tematicasDesbloqueadas.includes("videojuegos") ? "tema-videojuegos" : "tema-bloqueada"}
              onClick={tematicasDesbloqueadas.includes("videojuegos") ? () => handle("videojuegos") : () => desbloquearTematica("videojuegos", 200)}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-700 hover:bg-blue-600 rounded-xl shadow-lg grid place-items-center">
              <img
                src={tematicasDesbloqueadas.includes("videojuegos") ? videojuegos : lock}
                alt={tematicasDesbloqueadas.includes("videojuegos") ? "Mando de consola" : "Bloqueado"}
                className="w-12 h-12 sm:w-16 sm:h-16" />
            </button>
            {tematicasDesbloqueadas.includes("videojuegos") ? (
              <h2 className="text-base sm:text-lg font-bold mt-2 sm:mt-3">VIDEOJUEGOS</h2>
            ) : (
              <h2 className="text-base sm:text-xl font-bold mt-2 sm:mt-3 flex items-center">
                <img src={point} alt="Puntos" className="mr-2 w-5 h-5 sm:w-7 sm:h-7" />
                200
              </h2>
            )}
          </div>

          <div className="flex flex-col items-center">
            <button id={tematicasDesbloqueadas.includes("series") ? "tema-series" : "tema-bloqueada"}
              onClick={tematicasDesbloqueadas.includes("series") ? () => handle("series") : () => desbloquearTematica("series", 500)}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-700 hover:bg-blue-600 rounded-xl shadow-lg grid place-items-center">
              <img
                src={tematicasDesbloqueadas.includes("series") ? series : lock}
                alt={tematicasDesbloqueadas.includes("series") ? "Icono de la casa Stark de Juego de Tronos" : "Bloqueado"}
                className="w-12 h-12 sm:w-16 sm:h-16" />
            </button>
            {tematicasDesbloqueadas.includes("series") ? (
              <h2 className="text-base sm:text-lg font-bold mt-2 sm:mt-3">SERIES</h2>
            ) : (
              <h2 className="text-base sm:text-xl font-bold mt-2 sm:mt-3 flex items-center">
                <img src={point} alt="Puntos" className="mr-2 w-5 h-5 sm:w-7 sm:h-7" />
                500
              </h2>
            )}
          </div>

          <div className="flex flex-col items-center">
            <button id={tematicasDesbloqueadas.includes("peliculas") ? "tema-peliculas" : "tema-bloqueada"}
              onClick={tematicasDesbloqueadas.includes("peliculas") ? () => handle("peliculas") : () => desbloquearTematica("peliculas", 1000)}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-700 hover:bg-blue-600 rounded-xl shadow-lg grid place-items-center">
              <img
                src={tematicasDesbloqueadas.includes("peliculas") ? peliculas : lock}
                alt={tematicasDesbloqueadas.includes("peliculas") ? "Palomitas y gafas 3D de cine" : "Bloqueado"}
                className="w-12 h-12 sm:w-16 sm:h-16" />
            </button>
            {tematicasDesbloqueadas.includes("peliculas") ? (
              <h2 className="text-base sm:text-lg font-bold mt-2 sm:mt-3">PELICULAS</h2>
            ) : (
              <h2 className="text-base sm:text-xl font-bold mt-2 sm:mt-3 flex items-center">
                <img src={point} alt="Puntos" className="mr-2 w-5 h-5 sm:w-7 sm:h-7" />
                1000
              </h2>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Themes;