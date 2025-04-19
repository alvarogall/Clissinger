import { useNavigate } from 'react-router-dom';
import Creacion from '../components/Creacion';
import Layout from '../components/common/layout';

function LevelBirth() {
  const navigate = useNavigate();
  return (
    <Layout>
    <Creacion />
    </Layout>
  );
}

export default LevelBirth;