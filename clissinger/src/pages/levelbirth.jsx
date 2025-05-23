import { useState } from "react";
import Layout from '../components/common/layout';
import BotonVolverAtras from "./../components/common/botonVolverAtras";

export default function CrearNivel() {
  const [imagenes, setImagenes] = useState([null, null, null, null]);
  const [word, setWord] = useState("");
  const [hint, setHint] = useState("");
  const [thematic, setThematic] = useState("");
  const [loading,setLoading] = useState(false);

  const handleImageChange = (index, file) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes[index] = file;
    setImagenes(nuevasImagenes);
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "niveles"); // reemplaza con tu preset

    const res = await fetch("https://api.cloudinary.com/v1_1/ds7vt7dl9/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    
    try {
      const urls = await Promise.all(
        imagenes.map((img) => (img ? uploadImageToCloudinary(img) : null))
      );

      const nivel = {
        word,
        image1: urls[0],
        image2: urls[1],
        image3: urls[2],
        image4: urls[3],
        thematic,
        hint,
      };

      const res = await fetch("https://backend-woad-chi.vercel.app/api/levels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nivel),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      console.log("Nivel guardado en backend:", data);
      alert("¡Nivel creado con éxito!");
    } catch (error) {
      console.error("Error creando el nivel:", error);
      alert("Error al crear el nivel: " + error.message);
    } finally {
      setLoading(false)
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <h2 className="text-5xl font-extrabold mb-8 drop-shadow-[3px_3px_0px_black] text-center">
          Crear Nivel
        </h2>
      {loading && (
        <div className="mb-4 text-lg font-bold text-yellow-300 bg-black/60 px-6 py-3 rounded-xl shadow-lg">
          Creando Nivel, por favor espere...
        </div>
      )}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-lg w-full max-w-md"
        >
          <div className="grid grid-cols-2 gap-4 mb-6">
            {imagenes.map((img, i) => (
              <div key={i} className="flex flex-col items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(i, e.target.files[0])}
                  className="w-full text-sm text-white"
                />
                {img && (
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Preview ${i + 1}`}
                    className="w-24 h-24 mt-2 object-cover rounded border-2 border-white"
                  />
                )}
              </div>
            ))}
          </div>

          <input
            type="text"
            placeholder="Palabra clave"
            className="w-full p-3 mb-4 text-lg rounded bg-white/80 text-black placeholder-gray-600 focus:outline-none"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Pista (opcional)"
            className="w-full p-3 mb-6 text-lg rounded bg-white/80 text-black placeholder-gray-600 focus:outline-none"
            value={hint}
            onChange={(e) => setHint(e.target.value)}
          />
          
          <input
            type="text"
            placeholder="Tematica"
            className="w-full p-3 mb-6 text-lg rounded bg-white/80 text-black placeholder-gray-600 focus:outline-none"
            value={thematic}
            onChange={(e) => setThematic(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 text-white text-xl font-bold py-3 rounded-full drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] hover:bg-yellow-300 transition"
          >
            Crear Nivel
          </button>
        </form>

        <div className="flex absolute top-5 left-5">
          <BotonVolverAtras />
        </div>
      </div>
    </Layout>
  );
}