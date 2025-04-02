import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Settings from './pages/settings';
import Game from './pages/game';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ajustes" element={<Settings />} />
      <Route path="/juego" element={<Game />} />
    </Routes>
  );
}

export default App;