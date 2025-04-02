import React from "react";
import "tailwindcss/tailwind.css";
import BotonAjustes from "./botonAjustes";

const Inicio = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-950 to-blue-500 text-white relative">
      <nav className="absolute top-5 left-5 flex gap-12 text-lg font-semibold opacity-90">
        <a href="#" className="hover:underline">Sobre nosotros</a>
        <a href="#" className="hover:underline">Contáctanos</a>
      </nav>
      
      <h1 className="text-9xl font-bold mb-10 relative text-white drop-shadow-[4px_4px_0px_black]">
        CLI<span className="text-yellow-400">$$</span>ING3R
      </h1>

      <p className="mt-8 text-center max-w-2xl text-xl leading-relaxed">
        Clissinger es un juego en el que debes adivinar una palabra a partir de cuatro imágenes. Cada una te dará pistas visuales para encontrar la palabra correcta usando las letras disponibles. ¡Desafía tu mente y diviértete! Pulsa abajo para jugar.
      </p>

      <button className="mt-12 px-12 py-6 text-5xl font-bold bg-yellow-400 text-white rounded-full shadow-lg relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:w-full before:h-full before:scale-150 before:-translate-x-full before:transition-transform before:duration-700 hover:before:translate-x-0">
        JUGAR
      </button>
      <BotonAjustes />
    </div>
  );
};

export default Inicio;