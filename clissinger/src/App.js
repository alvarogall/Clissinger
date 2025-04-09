import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Settings from './pages/settings';
import Game from './pages/game';
import SobreNosotros from './components/SobreNosotros';
import Contactanos from './components/Contactanos';
import LoginForm from './pages/login';
import Themes from './pages/themes';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ajustes" element={<Settings />} />
      <Route path="/juego" element={<Game />} />
      <Route path="/sobrenosotros" element={<SobreNosotros />} />
      <Route path="/contactanos" element={<Contactanos />} />
      <Route path="/login" element={<LoginForm />} />+
      <Route path="/tematicas" element={<Themes />} />
    </Routes>
  );
}

export default App;