import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BotonVolverAtrasInicio from "../components/common/botonVolverAtrasInicio";
import Layout from "../components/common/layout";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const handleLogin = async () => {
    setMessage('Iniciando Sesión, por favor espere...')
    try {
      const res = await fetch("https://backend-woad-chi.vercel.app/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage(`✅ ${data.message}, redirigiendo a la página principal`);
      //Obtenemos el ID del usuario
      const userID = data.user._id;
      localStorage.setItem("userID", userID);
      console.log(userID);
      setTimeout(() => navigate("/jugar"), 1000); // redirige si login correcto
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-950 to-blue-500 text-white relative px-4">
        {/* Header region */}
        <header>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-8 drop-shadow-[3px_3px_0px_black]">
            Iniciar sesión
          </h1>
        </header>

        {/* Main content region */}
        <main className="w-full max-w-xl px-4">
          <form 
            className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-lg w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="mb-4">
              <label htmlFor="username-input" className="block text-white text-sm mb-1 sr-only">Usuario</label>
              <input
                id="username-input"
                type="text"
                placeholder="Usuario"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full p-3 mb-4 text-lg rounded bg-white/80 text-black placeholder-gray-600 focus:outline-none"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password-input" className="block text-white text-sm mb-1 sr-only">Contraseña</label>
              <input
                id="password-input"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
                className="w-full p-3 mb-6 text-lg rounded bg-white/80 text-black placeholder-gray-600 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="w-full bg-yellow-400 text-white text-xl font-bold py-3 rounded-full shadow hover:bg-yellow-300 transition drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
              >
                Iniciar sesión
              </button>

              <Link
                to="/register"
                className="w-full text-center border-2 border-yellow-400 text-yellow-400 text-xl font-bold py-3 rounded-full hover:bg-yellow-400 hover:text-white transition"
              >
                Crear cuenta
              </Link>
            </div>

            {message && (
              <div 
                className="mt-4 text-center text-sm" 
                role="status" 
                aria-live="polite"
              >
                {message}
              </div>
            )}
          </form>
        </main>

        {/* Navigation region */}
        <nav className="absolute top-5 left-5">
          <BotonVolverAtrasInicio />
        </nav>
      </div>
    </Layout>
  );
};

export default Login;