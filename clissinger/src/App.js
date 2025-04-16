import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Settings from './pages/settings';
import Game from './pages/game';
import SobreNosotros from './components/SobreNosotros';
import Contactanos from './components/Contactanos';
import LoginForm from './pages/login';
import Themes from './pages/themes';
import LevelBirth from './pages/levelbirth';
import Register from './pages/register';
import Play from './pages/play';
import Score from './pages/score';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ajustes" element={<Settings />} />
      <Route path="/juego" element={<Game />} />
      <Route path="/jugar" element={<Play />} />
      <Route path="/sobrenosotros" element={<SobreNosotros />} />
      <Route path="/contactanos" element={<Contactanos />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tematicas" element={<Themes />} />
      <Route path="/crear" element={<LevelBirth />} />
      <Route path="/score" element={<Score />} />
    </Routes>
  );
}

export default App;