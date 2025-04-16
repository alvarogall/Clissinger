import React from "react";
import BotonVolverAtras from "../components/common/botonVolverAtras";
import "tailwindcss/tailwind.css";

const Contactanos = () => {
    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-950 to-blue-500 text-white px-8 py-20">
        <h2 className="text-6xl font-bold mb-10 text-white drop-shadow-[4px_4px_0px_black]">
        Contáctanos
        </h2>
        <p className="max-w-3xl text-xl text-center leading-relaxed">
        ¿Tienes dudas, sugerencias o simplemente quieres saludarnos? ¡Nos encantaría escucharte!
        Puedes escribirnos a <span className="text-yellow-300">contacto@clissinger.com</span> o encontrarnos en nuestras redes sociales.
        </p>
        <div className="flex absolute top-5 left-5">
        <BotonVolverAtras />
      </div>
    </div>
    );
};

export default Contactanos;
