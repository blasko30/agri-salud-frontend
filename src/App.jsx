import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Diagnostico from './pages/Diagnostico';
import Historial from './pages/Historial';
import Perfil from './pages/Perfil'; 
import Clima from './components/Clima';
import Luna from './components/Luna';

// === COMPONENTE DE NAVEGACIÓN INTELIGENTE ===
function Navigation() {
  const navigate = useNavigate();
  const location = useLocation(); // Para que el menú se actualice al cambiar de ruta
  console.log(location);
  // Verificamos si existe la llave en el bolsillo
  const estaLogueado = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('plan');
    alert("Sesión cerrada correctamente ");
    navigate('/login');
  };

  return (
    <nav style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', flexWrap: 'wrap' }}>
      
      {/* Enlaces públicos */}
      <Link to="/" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Inicio</Link>
      <Link to="/diagnostico" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>Diagnóstico</Link>

      {/* === LÓGICA DEL USUARIO === */}
      {estaLogueado ? (
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            
            {/* Enlace al Historial */}
            <Link to="/historial" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>
                Historial
            </Link>

            {/* Enlace al Perfil (NUEVO) */}
            <Link to="/perfil" style={{ color: '#f1c40f', fontWeight: 'bold', fontSize: '1.1rem' }}>
                Mi Perfil 👤
            </Link>

            {/* Botón de Salir */}
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
                Salir
            </button>
        </div>
      ) : (
        // Si NO está logueado
        <Link to="/login" style={{ color: '#2ecc71', fontWeight: 'bold', fontSize: '1.1rem' }}>
          Ingresar
        </Link>
      )}

    </nav>
  );
}

// === PANTALLA DE INICIO ===
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
      <Luna /> {/* <--- AQUÍ LO AGREGAS */}

      <div style={{ marginTop: '40px' }}></div>

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
           Comenzar Diagnóstico
        </Link>
      </div>
    </div>
  );
}

// === APP PRINCIPAL ===
function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/diagnostico" element={<Diagnostico />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/perfil" element={<Perfil />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;