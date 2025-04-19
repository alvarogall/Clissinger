import { useNavigate } from 'react-router-dom';
import Inicio from '../components/Inicio';
import Layout from '../components/common/layout';

function Home() {
  const navigate = useNavigate();
  return (
    <Layout>
    <Inicio />
    </Layout>
  );
}

export default Home;