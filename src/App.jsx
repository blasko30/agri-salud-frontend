import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Diagnostico from './pages/Diagnostico';
import Clima from './components/Clima'; // Importamos el Clima

// COMPONENTE HOME (PANTALLA DE INICIO)
function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
      <h1 style={{ textShadow: '2px 2px 4px black', color: 'white', fontSize: '3rem', margin: 0 }}>
        Agri-Salud 🌿
      </h1>
      <p style={{ fontSize: '1.2rem', textShadow: '1px 1px 2px black', marginBottom: '30px', color: '#eee' }}>
        Inteligencia Artificial al servicio del campo.
      </p>
      
      {/* TARJETA DE CLIMA */}
      <Clima /> 

      <div style={{ marginTop: '40px' }}>
        <Link to="/diagnostico" style={{
          backgroundColor: '#2ecc71',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '30px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
          textDecoration: 'none'
        }}>
          🚀 Comenzar Diagnóstico
        </Link>
      </div>
    </div>
  );
}

// COMPONENTE APP (CONTROLADOR PRINCIPAL)
function App() {
  return (
    <BrowserRouter>
      {/* MENÚ DE NAVEGACIÓN */}
      <nav style={{ padding: '20px', display: 'flex', justifyContent: 'center', gap: '30px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}>
        <Link to="/" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Inicio</Link>
        <Link to="/diagnostico" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Diagnóstico</Link>
        <Link to="/login" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Cuenta</Link>
      </nav>

      {/* RUTAS DE LAS PÁGINAS */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/diagnostico" element={<Diagnostico />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;