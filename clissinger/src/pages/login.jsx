import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BotonVolverAtras from "../components/common/botonVolverAtras";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("https://backend-49jz9ahwr-scrpts-projects.vercel.app/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage(`✅ ${data.message}`);
      setTimeout(() => navigate("/juego"), 1000); // redirige si login correcto
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  const handleRegister = async () => {
    try {
      const res = await fetch("https://backend-49jz9ahwr-scrpts-projects.vercel.app/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage(`✅ Usuario creado correctamente`);
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-950 to-blue-500 text-white relative px-6">
      <h2 className="text-6xl font-extrabold mb-8 drop-shadow-[3px_3px_0px_black]">
        Iniciar sesión
      </h2>

      <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-lg w-full max-w-md">
        <input
          type="text"
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="w-full p-3 mb-4 text-lg rounded bg-white/80 text-black placeholder-gray-600 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 text-lg rounded bg-white/80 text-black placeholder-gray-600 focus:outline-none"
        />

        <div className="flex flex-col gap-4">
          <button
            onClick={handleLogin}
            className="w-full bg-yellow-400 text-white text-xl font-bold py-3 rounded-full shadow hover:bg-yellow-300 transition"
          >
            Iniciar sesión
          </button>

          <button
            onClick={handleRegister}
            className="w-full border-2 border-yellow-400 text-yellow-400 text-xl font-bold py-3 rounded-full hover:bg-yellow-400 hover:text-white transition"
          >
            Crear cuenta
          </button>
        </div>

        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>

      <div className="flex absolute top-5 left-5">
        <BotonVolverAtras />
      </div>
    </div>
  );
};

export default Login;
