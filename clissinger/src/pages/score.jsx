
import completado from "../images/completado.svg";
import fracaso from "../images/fracaso.svg";
import gameover from "../images/gameover.png";
import point from "../images/point.svg";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/common/layout";


function Score() {

  const {resultado} = useParams();
  const victoria = resultado === "victoria";
    
    return (
      <Layout>
      {victoria ? (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-950 to-green-400 text-white relative">
            <div className="flex flex-col items-center mb-24 pb-24">
            <img src={completado} alt="Felicitaciones" className="w-[500px] h-[340px] translate-y-24" />               
            <div className="bg-blue-500 shadow-md rounded-md p-24 w-[400px] h-[500px] flex flex-col items-center  ">
                <p className="text-center text-4xl font-bold text-white mb-10">¡Felicidades! </p>
                <p className="text-center text-2xl text-white">Recompensa</p><br/>
                 <div className="flex items-center gap-2">
                      <img src={point} alt="Icono de puntos" className="w-8 h-8" />
                      <span className="text-3xl font-bold">100</span>
                    </div>
                <Link
                        to="/jugar"
                        className="mt-20 px-6 py-3 text-xl font-bold bg-yellow-400 text-white rounded-full shadow-lg"
                      >
                        Volver al menú
                      </Link>
            </div>
            </div>
        </div>

      ) : (
          
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-950 to-red-400 text-white relative">
          <div className="flex flex-col items-center mb-24 pb-24">
            <img src={fracaso} alt="Fracaso" className="w-[500px] h-[340px] translate-y-24" />               
            <div className="bg-blue-500 shadow-md rounded-md p-24 w-[400px] h-[500px] flex flex-col items-center  ">
                <p className="text-center text-3xl font-bold text-white mb-4 ">¡No te rindas!</p>
                
                <div className="flex flex-col items-center h-[200px] ">
                  <p className="text-center text-3xl font-bold text-white w-[400px]">Sigue intentándolo</p>
                  <img src={gameover} alt="FinJuego" className="w-[300px] h-[230px] object-cover"  />
                </div>
              <Link to="/jugar" className=" px-6 py-3 text-xl font-bold bg-yellow-400 text-white rounded-full shadow-lg">Volver al menú</Link>
            </div> 
          </div>
        </div>
      )}
      </Layout>
    );
  };
  
export default Score;
  