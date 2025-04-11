import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BotonVolverAtras from "../components/common/botonVolverAtras";

const Register = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch("https://backend-woad-chi.vercel.app/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage("✅ Usuario creado correctamente");
      setTimeout(() => navigate("/login"), 1500); // Redirige después de registrarse
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-950 to-blue-500 text-white relative px-6">
      <h2 className="text-5xl font-extrabold mb-8 drop-shadow-[3px_3px_0px_black]">
        Crear cuenta
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

        <button
          onClick={handleRegister}
          className="w-full bg-yellow-400 text-white text-xl font-bold py-3 rounded-full shadow hover:bg-yellow-300 transition"
        >
          Registrarse
        </button>

        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>

      <div className="flex absolute top-5 left-5">
        <BotonVolverAtras />
      </div>
    </div>
  );
};

export default Register;
