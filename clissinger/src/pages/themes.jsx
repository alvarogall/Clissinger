import Layout from '../components/common/layout';
import React, { fetchPoints, useState } from "react";
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
import TutorialDriver from '../components/TutorialDriverThemes';
import { useEffect } from 'react';
import PointsDisplay from '../components/PointsDisplay'; 


function Themes() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || "normal";


  //PRUEBA DESBLOQUEO TEMATICAS
  const userID = localStorage.getItem("userID");
  const [puntos, setPoints] = useState(0);
  const [tematicasDesbloqueadas, setTematicasDesbloqueadas] = useState([]);
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
          points: -coste, //LE PASAMOS CANTIDAD NEGATIVA (PUEDE DAR PROBLEMAS-APAÑO TEMPORAL)
        }),
      });

      if (!res.ok) throw new Error("Error al actualizar usuario en backend");

      const nuevosPuntos = puntos - coste;
      setPoints(nuevosPuntos);

       setTematicasDesbloqueadas(prev => [...prev, nombre]); //GUARDA TEMATICAS LOCALMENTE-APAÑO TEMPORAL

      alert(`¡"${nombre.toUpperCase()}" desbloqueado!`);
    } catch (error) {
      console.error("Error restando puntos:", error);
      alert("Hubo un error al restar los puntos. Intenta de nuevo.");
    }
  } else {
    alert("No tienes suficientes puntos.");
  }
};

  console.log("Modo seleccionado:", mode);

  const handle = (thematic) => {
    navigate('/juego', { state: { thematic, mode } });
  };
  

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-950 to-blue-500 text-white relative px-2 sm:px-0">
        
        {/* Botón Volver Atrás */}
        <div className="absolute top-4 left-4 z-30">
          <BotonVolverAtrasMenu />
        </div>

        {/* Puntos */}
        <PointsDisplay points={puntos} />

        <TutorialDriver tematicasDesbloqueadas={tematicasDesbloqueadas} />

        <div className="w-full bg-blue-500 min-h-16 sm:min-h-20 absolute top-[7%] sm:top-[11%] text-center text-3xl sm:text-5xl font-bold text-white py-4 sm:py-6">
          SELECCIONA UNA TEMÁTICA
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-16 sm:gap-y-32 gap-x-4 sm:gap-x-0 w-full sm:w-[60%] place-items-center mt-28 sm:mt-24 px-2">
          <div className="flex flex-col items-center">
            <button id ="tema-paises"
              onClick={() => handle('banderas')}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-800 hover:bg-blue-700 rounded-xl shadow-lg grid place-items-center"
            >
              <img src={iconspain} alt="Banderas" className="w-12 h-12 sm:w-16 sm:h-16" />
            </button>
            <p className="text-base sm:text-lg font-bold mt-2 sm:mt-3">PAÍSES</p>
          </div>

          <div className="flex flex-col items-center">
            <button id ="tema-deportes"
              onClick={() => handle('deportes')}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-800 hover:bg-blue-700 rounded-xl shadow-lg grid place-items-center"
            >
              <img src={trophy} alt="Deportes" className="w-12 h-12 sm:w-16 sm:h-16" />
            </button>
            <p className="text-base sm:text-lg font-bold mt-2 sm:mt-3">DEPORTES</p>
          </div>

          <div className="flex flex-col items-center">
            <button id ="tema-historia"
              onClick={() => handle('historia')}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-800 hover:bg-blue-700 rounded-xl shadow-lg grid place-items-center"
            >
              <img src={history} alt="Historia" className="w-12 h-12 sm:w-16 sm:h-16" />
            </button>
            <p className="text-base sm:text-lg font-bold mt-2 sm:mt-3">HISTORIA</p>
          </div>

          {/* TEMATICAS BLOQUEADAS */}

          <div className="flex flex-col items-center">
            {/*SI LA TEMATICA ESTA DESBLOQUEADA CAMBIA ID, ACCIÓN E IMAGEN*/}
            <button  id={tematicasDesbloqueadas.includes("videojuegos") ? "tema-videojuegos" : "tema-bloqueada"} 
              onClick={tematicasDesbloqueadas.includes("videojuegos") ? () => handle("videojuegos") : () => desbloquearTematica("videojuegos", 200)}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-700 hover:bg-blue-600 rounded-xl shadow-lg grid place-items-center">
                <img
                  src={tematicasDesbloqueadas.includes("videojuegos") ? videojuegos : lock}
                  alt={tematicasDesbloqueadas.includes("videojuegos") ? "Videojuegos" : "Bloqueado"}
              className="w-12 h-12 sm:w-16 sm:h-16" />
            </button>

            {/*SI LA TEMATICA ESTA DESBLOQUEADA CAMBIA TEXTO*/}
            {tematicasDesbloqueadas.includes("videojuegos") ? (
            <p className="text-base sm:text-lg font-bold mt-2 sm:mt-3">VIDEOJUEGOS</p>
            ) : (
            <p className="text-base sm:text-xl font-bold mt-2 sm:mt-3 flex items-center">
            <img src={point} alt="Puntos" className="mr-2 w-5 h-5 sm:w-7 sm:h-7" />
            200
            </p>
            )}
          </div>

          <div className="flex flex-col items-center">
            {/*SI LA TEMATICA ESTA DESBLOQUEADA CAMBIA ID, ACCIÓN E IMAGEN*/}
            <button  id={tematicasDesbloqueadas.includes("series") ? "tema-series" : "tema-bloqueada"} 
              onClick={tematicasDesbloqueadas.includes("series") ? () => handle("series") : () => desbloquearTematica("series", 500)}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-700 hover:bg-blue-600 rounded-xl shadow-lg grid place-items-center">
                <img
                  src={tematicasDesbloqueadas.includes("series") ? series : lock}
                  alt={tematicasDesbloqueadas.includes("series") ? "Series" : "Bloqueado"}
              className="w-12 h-12 sm:w-16 sm:h-16" />
            </button>
            
             {/*SI LA TEMATICA ESTA DESBLOQUEADA CAMBIA TEXTO*/}
            {tematicasDesbloqueadas.includes("series") ? (
            <p className="text-base sm:text-lg font-bold mt-2 sm:mt-3">SERIES</p>
            ) : (
            <p className="text-base sm:text-xl font-bold mt-2 sm:mt-3 flex items-center">
            <img src={point} alt="Puntos" className="mr-2 w-5 h-5 sm:w-7 sm:h-7" />
            500
            </p>
          )}
          </div>

          <div className="flex flex-col items-center">
             <div className="flex flex-col items-center">
            {/*SI LA TEMATICA ESTA DESBLOQUEADA CAMBIA ID, ACCIÓN E IMAGEN*/}
            <button  id={tematicasDesbloqueadas.includes("peliculas") ? "tema-peliculas" : "tema-bloqueada"} 
              onClick={tematicasDesbloqueadas.includes("peliculas") ? () => handle("peliculas") : () => desbloquearTematica("peliculas", 1000)}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-700 hover:bg-blue-600 rounded-xl shadow-lg grid place-items-center">
                <img
                  src={tematicasDesbloqueadas.includes("peliculas") ? peliculas : lock}
                  alt={tematicasDesbloqueadas.includes("peliculas") ? "Peliculas" : "Bloqueado"}
              className="w-12 h-12 sm:w-16 sm:h-16" />
            </button>

             {/*SI LA TEMATICA ESTA DESBLOQUEADA CAMBIA TEXTO*/}
            {tematicasDesbloqueadas.includes("peliculas") ? (
            <p className="text-base sm:text-lg font-bold mt-2 sm:mt-3">PELICULAS</p>
            ) : (
            <p className="text-base sm:text-xl font-bold mt-2 sm:mt-3 flex items-center">
            <img src={point} alt="Puntos" className="mr-2 w-5 h-5 sm:w-7 sm:h-7" />
            1000
            </p>
          )}
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
}

export default Themes;