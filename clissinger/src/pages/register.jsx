import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BotonVolverAtrasInicio from "../components/common/botonVolverAtrasInicio";

const Register = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setMessage('Creando cuenta, por favor espere...')
    try {
      const res = await fetch("https://backend-woad-chi.vercel.app/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      const userID = data._id || data.user?._id;
      if (userID) {
        localStorage.setItem("userID", userID);
        console.log("Guardado userID en localStorage:", userID);
      }
      
      setMessage("✅ Usuario creado correctamente, redirigiendo a la página principal...");
      setTimeout(() => navigate("/jugar"), 1500);
      
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <main>
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-950 to-blue-500 text-white relative px-6">
      <h1 className="text-5xl font-extrabold mb-8 drop-shadow-[3px_3px_0px_black]">
        Crear cuenta
      </h1>

      <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-lg w-full max-w-md">
        <label htmlFor="username-input" className="block text-white text-sm mb-1 sr-only">Usuario</label>
        <input
          id="username-input"
          type="text"
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="w-full p-3 mb-4 text-lg rounded bg-white/80 text-black placeholder-gray-600 focus:outline-none"
        />
        <label htmlFor="password-input" className="block text-white text-sm mb-1 sr-only">Contraseña</label>
        <input
          id="password-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleRegister();
          }}
          className="w-full p-3 mb-6 text-lg rounded bg-white/80 text-black placeholder-gray-600 focus:outline-none"
        />

        <button
          onClick={handleRegister}
          className="ml-5 mt-8 sm:mt-12 px-8 sm:px-12 py-4 sm:py-6 text-3xl sm:text-5xl font-bold bg-yellow-500 text-white rounded-full shadow-lg relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:w-full before:h-full before:scale-150 before:-translate-x-full before:transition-transform before:duration-700 hover:before:translate-x-0 hover:bg-yellow-550 transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
        >
          Registrarse
        </button>

        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>

      <div className="flex absolute top-5 left-5">
        <BotonVolverAtrasInicio />
      </div>
    </div>
  </main>
  );
};

export default Register;
