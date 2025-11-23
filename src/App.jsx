import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Diagnostico from './pages/Diagnostico';
import Clima from './components/Clima';

// Componente para el botón de Cerrar Sesión (Necesita estar dentro del Router)
function Navigation() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Borramos las llaves del bolsillo
    localStorage.removeItem('token');
    localStorage.removeItem('plan');
    
    // 2. Avisamos y redirigimos
    alert("Sesión cerrada correctamente 👋");
    navigate('/login');
  };

  return (
    <nav style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', flexWrap: 'wrap' }}>
      <Link to="/" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Inicio</Link>
      <Link to="/diagnostico" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Diagnóstico</Link>
      <Link to="/login" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Ingresar</Link>
      
      {/* BOTÓN DE SALIR */}
      <button 
        onClick={handleLogout}
        style={{
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          padding: '8px 15px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '0.9rem'
        }}
      >
        Salir 🚪
      </button>
    </nav>
  );
}

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
      <h1 style={{ textShadow: '2px 2px 4px black', color: 'white', fontSize: '3rem', margin: 0 }}>
        Agri-Salud 🌿
      </h1>
      <p style={{ fontSize: '1.2rem', textShadow: '1px 1px 2px black', marginBottom: '30px', color: '#eee' }}>
        Inteligencia Artificial al servicio del campo.
      </p>
      <Clima /> 
      <div style={{ marginTop: '40px' }}>
        <Link to="/diagnostico" style={{
          backgroundColor: '#2ecc71', color: 'white', padding: '15px 30px', borderRadius: '30px',
          fontSize: '1.2rem', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.5)', textDecoration: 'none'
        }}>
          🚀 Comenzar Diagnóstico
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* Usamos el componente Navigation aquí dentro */}
      <Navigation />

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