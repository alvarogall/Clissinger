import Layout from '../components/common/layout';
import React from "react";
import { useNavigate } from 'react-router-dom';
import lock from '../images/lock.svg';
import iconspain from '../images/iconspain.svg';
import trophy from '../images/trophy.svg';
import history from '../images/history.svg';
import point from '../images/point.svg';

function Themes() {
  const navigate = useNavigate();
  const handle = (thematic) => {
    navigate('/juego', { state: { thematic } });
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-950 to-blue-500 text-white relative px-2 sm:px-0">

        <div className="w-full bg-blue-500 min-h-16 sm:min-h-20 absolute top-[7%] sm:top-[11%] text-center text-3xl sm:text-5xl font-bold text-white py-4 sm:py-6">
          SELECCIONA UNA TEMÁTICA
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-16 sm:gap-y-32 gap-x-4 sm:gap-x-0 w-full sm:w-[60%] place-items-center mt-28 sm:mt-24 px-2">
          <div className="flex flex-col items-center">
            <button
              onClick={() => handle('banderas')}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-800 hover:bg-blue-700 rounded-xl shadow-lg grid place-items-center"
            >
              <img src={iconspain} alt="Banderas" className="w-12 h-12 sm:w-16 sm:h-16" />
            </button>
            <p className="text-base sm:text-lg font-bold mt-2 sm:mt-3">BANDERAS</p>
          </div>

          <div className="flex flex-col items-center">
            <button
              onClick={() => handle('deportes')}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-800 hover:bg-blue-700 rounded-xl shadow-lg grid place-items-center"
            >
              <img src={trophy} alt="Deportes" className="w-12 h-12 sm:w-16 sm:h-16" />
            </button>
            <p className="text-base sm:text-lg font-bold mt-2 sm:mt-3">DEPORTES</p>
          </div>

          <div className="flex flex-col items-center">
            <button
              onClick={() => handle('historia')}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-800 hover:bg-blue-700 rounded-xl shadow-lg grid place-items-center"
            >
              <img src={history} alt="Historia" className="w-12 h-12 sm:w-16 sm:h-16" />
            </button>
            <p className="text-base sm:text-lg font-bold mt-2 sm:mt-3">HISTORIA</p>
          </div>

          <div className="flex flex-col items-center">
            <button className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-700 hover:bg-blue-600 rounded-xl shadow-lg grid place-items-center">
              <img src={lock} alt="Bloqueado" className="w-12 h-12 sm:w-16 sm:h-16" />
            </button>
            <p className="text-base sm:text-xl font-bold mt-2 sm:mt-3 flex items-center">
              <img src={point} alt="Puntos" className="mr-2 w-5 h-5 sm:w-7 sm:h-7" />
              200
            </p>
          </div>

          <div className="flex flex-col items-center">
            <button className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-700 hover:bg-blue-600 rounded-xl shadow-lg grid place-items-center">
              <img src={lock} alt="Bloqueado" className="w-12 h-12 sm:w-16 sm:h-16" />
            </button>
            <p className="text-base sm:text-xl font-bold mt-2 sm:mt-3 flex items-center">
              <img src={point} alt="Puntos" className="mr-2 w-5 h-5 sm:w-7 sm:h-7" />
              500
            </p>
          </div>

          <div className="flex flex-col items-center">
            <button className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-700 hover:bg-blue-600 rounded-xl shadow-lg grid place-items-center">
              <img src={lock} alt="Bloqueado" className="w-12 h-12 sm:w-16 sm:h-16" />
            </button>
            <p className="text-base sm:text-xl font-bold mt-2 sm:mt-3 flex items-center">
              <img src={point} alt="Puntos" className="mr-2 w-5 h-5 sm:w-7 sm:h-7" />
              1000
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Themes;