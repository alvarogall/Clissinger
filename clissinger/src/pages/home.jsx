import { Link } from "react-router-dom";
import { useState } from "react";
import "tailwindcss/tailwind.css";
import Layout from "../components/common/layout";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Layout>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-950 to-blue-500 text-white relative px-4 py-6">
      <nav className="absolute top-4 sm:top-5 left-0 right-0 px-4 sm:px-5 flex justify-between items-center text-base sm:text-lg font-semibold opacity-90 z-20">
        {/* Menú hamburguesa en móvil y enlaces en escritorio a la IZQUIERDA */}
        <div className="flex items-center">
          {/* Menú hamburguesa en móvil */}
          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none flex flex-col justify-center items-center w-10 h-10"
              aria-label="Abrir menú"
            >
              <span className="block w-7 h-1 bg-white mb-1 rounded"></span>
              <span className="block w-7 h-1 bg-white mb-1 rounded"></span>
              <span className="block w-7 h-1 bg-white rounded"></span>
            </button>
            {/* Menú desplegable */}
            {menuOpen && (
              <div className="absolute left-4 top-14 bg-blue-900 rounded-lg shadow-lg flex flex-col items-start py-2 px-4 gap-2">
                <Link to="/sobrenosotros" className="hover:underline" onClick={() => setMenuOpen(false)}>
                  Sobre Nosotros
                </Link>
                <Link to="/contactanos" className="hover:underline" onClick={() => setMenuOpen(false)}>
                  Contáctanos
                </Link>
              </div>
            )}
          </div>
          {/* Menú normal en escritorio */}
          <div className="hidden sm:flex gap-12">
            <Link to="/sobrenosotros" className="hover:underline">
              Sobre Nosotros
            </Link>
            <Link to="/contactanos" className="hover:underline">
              Contáctanos
            </Link>
          </div>
        </div>

        {/* Botón crear un nivel SIEMPRE a la DERECHA */}
        <Link
          to="/crear"
          className="bg-yellow-400 text-blue-950 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-bold shadow hover:bg-yellow-300 transition text-sm sm:text-base"
        >
          Crea un nivel
        </Link>
      </nav>

      <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold mb-6 sm:mb-10 relative text-white drop-shadow-[4px_4px_0px_black] mt-16 sm:mt-0 text-center">
        CLI<span className="text-yellow-400">$$</span>ING3R
      </h1>

      <p className="mt-4 sm:mt-8 text-center max-w-2xl text-base sm:text-xl leading-relaxed px-4">
        Clissinger es un juego en el que debes adivinar una palabra a partir de cuatro imágenes. Cada una te dará pistas visuales para encontrar la palabra correcta usando las letras disponibles. ¡Desafía tu mente y diviértete! Pulsa abajo para jugar.
      </p>

      <Link
        to="/login"
        className="mt-8 sm:mt-12 px-8 sm:px-12 py-4 sm:py-6 text-3xl sm:text-5xl font-bold bg-yellow-400 text-white rounded-full shadow-lg relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:w-full before:h-full before:scale-150 before:-translate-x-full before:transition-transform before:duration-700 hover:before:translate-x-0"
      >
        JUGAR
      </Link>
    </div>
    </Layout>
  );
}

export default Home;