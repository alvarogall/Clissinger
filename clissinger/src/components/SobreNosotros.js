// src/SobreNosotros.js
import React from "react";
import BotonVolverAtras from "../components/common/botonVolverAtras";
import "tailwindcss/tailwind.css";

const SobreNosotros = () => {
    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-950 to-blue-500 text-white px-8 py-20">
        <h2 className="text-6xl font-bold mb-10 text-white drop-shadow-[4px_4px_0px_black]">
        Sobre Nosotros
        </h2>
        <p className="max-w-3xl text-xl text-center leading-relaxed">
        Somos un pequeño equipo apasionado por los juegos que combinan lógica e imaginación. Clissinger nace del deseo de mezclar el clásico "4 imágenes 1 palabra" con un estilo visual fresco y moderno. Nuestro objetivo es que cada partida sea un reto divertido y visualmente atractivo. ¡Gracias por jugar!
        </p>
        <div className="flex absolute top-5 left-5">
        <BotonVolverAtras />
      </div>
    </div>
    );
};

export default SobreNosotros;
