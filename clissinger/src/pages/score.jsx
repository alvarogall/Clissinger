
import completado from "../images/completado.svg";
import fracaso from "../images/fracaso.svg";
import gameover from "../images/gameover.png";
import point from "../images/point.svg";
import { useLocation, useParams, Link } from "react-router-dom";
import Layout from "../components/common/layout";
import { useSettings } from '../context/SettingsContext';
import { useEffect } from "react";

function Score() {

  const { setSoundEvent } = useSettings();
  const {resultado} = useParams();
  const victoria = resultado === "victoria";
  const location = useLocation();
  const score = location.state?.score ?? 0; 

   useEffect(() => {
    return () => {
      setSoundEvent(null); 
    };
  }, [setSoundEvent]);

  useEffect(() => {
    if (victoria) {
      setSoundEvent('victoria');
    } else {
      setSoundEvent('derrota');
    }
  }, [victoria, setSoundEvent]);
    
    return (
      <Layout>
      {victoria ? (
        <main className="flex flex-col items-center justify-center  min-h-screen bg-gradient-to-b from-blue-950 to-green-400 text-white relative">
            <div className="flex flex-col items-center -translate-y-24">
            <img src={completado} alt="Felicitaciones" className="w-[500px] h-[340px] translate-y-24" />               
            <div className="bg-blue-500 shadow-md rounded-md p-24 w-[310px] h-[400px] sm:w-[400px] sm:h-[450px] flex flex-col items-center">
                <h1 className="text-center text-4xl font-bold text-white mb-10">¡Felicidades! </h1>
                <h2 className="text-center text-2xl text-white">Recompensa</h2><br/>
                 <div className="flex items-center gap-2">
                      <img src={point} alt="Icono de puntos" className="w-8 h-8" />
                      <span className="text-3xl font-bold">{score}</span>
                    </div>
                    <Link
                        to="/jugar"
                        className="mt-8 sm:mt-11 px-1 sm:px-6 py-3 text-sm sm:text-xl font-bold bg-yellow-500 text-white rounded-xl sm:rounded-full shadow-lg drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
                      >
                        Volver al menú
                      </Link>
            </div>
            </div>
        </main>

      ) : (
          
        <main className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-950 to-red-400 text-white relative">
          <div className="flex flex-col items-center -translate-y-24">
            <img src={fracaso} alt="Fracaso" className="w-[500px] h-[340px] translate-y-24" />               
            <div className="bg-blue-500 shadow-md rounded-md p-20 sm:p-24 w-[310px] h-[400px] sm:w-[400px] sm:h-[450px] flex flex-col items-center  ">
                <h1 className="text-center text-lg sm:text-3xl font-bold text-white mb-4 sm:-translate-y-2">¡No te rindas!</h1>
                <div className="flex flex-col items-center h-[200px] ">
                  <h2 className="text-center mb-5 text-lg sm:text-3xl font-bold text-white w-[400px] -translate-y-4">Sigue intentándolo</h2>
                  <img src={gameover} alt="FinJuego" className="w-[190px] h-[120px] sm:w-[260px] sm:h-[230px] object-cover sm:-translate-y-14"  />
                </div>
              <Link to="/jugar" className="mt-2 sm:mt-10 px-1 sm:px-6 py-3 text-sm sm:text-xl font-bold bg-yellow-500 text-white rounded-xl sm:rounded-full shadow-lg drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] sm:-translate-y-20">Volver al menú</Link>
            </div> 
          </div>
        </main>
      )}
      </Layout>
    );
  };
  
export default Score;
  