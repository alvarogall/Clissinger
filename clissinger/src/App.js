import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Settings from './pages/settings';
import Game from './pages/game';
import SobreNosotros from './components/SobreNosotros';
import Contactanos from './components/Contactanos';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ajustes" element={<Settings />} />
      <Route path="/juego" element={<Game />} />
      <Route path="/SobreNosotros" element={<SobreNosotros />} />
      <Route path="/Contactanos" element={<Contactanos />} />
    </Routes>
  );
}

export default App;