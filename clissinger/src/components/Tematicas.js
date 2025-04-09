import React from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import lock from '../images/lock.svg'
import iconspain from '../images/iconspain.svg'
import trophy from '../images/trophy.svg'
import history from '../images/history.svg'
import point from '../images/point.svg'

const Tematicas = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-950 to-blue-500 text-white relative">
      
      <div className="w-full bg-blue-500 min-h-20 absolute top-[11%] text-center text-5xl font-bold text-white py-6">
        SELECCIONA UNA TEMÁTICA
      </div>

      <div className="grid grid-cols-3 gap-y-48 w-[60%] place-items-center mt-24">
        <div className ="flex flex-col items-center">
            <button className="w-24 h-24 bg-blue-800 hover:bg-blue-700 rounded-xl shadow-lg place-items-center">
            <img src={iconspain} alt="Imagen encima del botón" className="w-16 h-16" />
            </button>
            <p className="text-lg font-bold mt-3">BANDERAS</p>
        </div>

        <div className ="flex flex-col items-center">
            <button className="w-24 h-24 bg-blue-800 hover:bg-blue-700 rounded-xl shadow-lg place-items-center">
            <img src={trophy} alt="Imagen encima del botón" className="w-16 h-16" />
            </button>
            <p className="text-lg font-bold mt-3">DEPORTES</p>
        </div>

        <div className ="flex flex-col items-center">
            <button className="w-24 h-24 bg-blue-800 hover:bg-blue-700 rounded-xl shadow-lg place-items-center">
            <img src={history} alt="Imagen encima del botón" className="w-16 h-16" />
            </button>
            <p className="text-lg font-bold mt-3">HISTORIA</p>
        </div>

        <div className ="flex flex-col items-center"> 
            <button className="w-24 h-24 bg-blue-700 hover:bg-blue-600 rounded-xl shadow-lg place-items-center">
            <img src={lock} alt="Imagen encima del botón" className="w-16 h-16" />
            </button>
            <p className="text-xl font-bold mt-3 flex">
              <img src={point} alt="Imagen encima del botón" className="mr-2 w-7 h-7" />
                200</p>
        </div>

        <div className ="flex flex-col items-center"> 
            <button className="w-24 h-24 bg-blue-700 hover:bg-blue-600 rounded-xl shadow-lg place-items-center">
            <img src={lock} alt="Imagen encima del botón" className="w-16 h-16" />
            </button>
            <p className="text-xl font-bold mt-3 flex">
              <img src={point} alt="Imagen encima del botón" className="mr-2 w-7 h-7" />
                500</p>
        </div>

        <div className ="flex flex-col items-center"> 
            <button className="w-24 h-24 bg-blue-700 hover:bg-blue-600 rounded-xl shadow-lg place-items-center">
            <img src={lock} alt="Imagen encima del botón" className="w-16 h-16" />
            </button>
            <p className="text-xl font-bold mt-3 flex">
              <img src={point} alt="Imagen encima del botón" className="mr-2 w-7 h-7" />
                1000</p>
        </div>

      </div>   
    </div>
  );
};

export default Tematicas;