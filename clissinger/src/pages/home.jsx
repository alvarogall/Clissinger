import { useNavigate } from 'react-router-dom';
import Inicio from '../components/Inicio';

function Home() {
  const navigate = useNavigate();
  return (
    <Inicio />
  );
}

export default Home;