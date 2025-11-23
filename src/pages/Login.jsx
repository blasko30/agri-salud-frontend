import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Importamos Link

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Recuerda: el reemplazo masivo ya puso la URL de Render aquí
      const respuesta = await axios.post('https://agri-salud-backend.onrender.com/api/user/login', formData);
      
      localStorage.setItem('token', respuesta.data.token);
      localStorage.setItem('plan', respuesta.data.plan);
      
      navigate('/'); // Al inicio
      
    } catch {
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto' }}>
      
      {/* TARJETA CON EFECTO VIDRIO */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)', // Fondo blanco semi-transparente
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
        textAlign: 'center'
      }}>
        
        <h2 style={{ color: '#2c3e50', marginTop: 0 }}>Iniciar Sesión 🚜</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', textAlign: 'left', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>Correo:</label>
            <input 
              type="email" 
              name="email" 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', textAlign: 'left', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>Contraseña:</label>
            <input 
              type="password" 
              name="password" 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
            />
          </div>

          <button type="submit" style={{ 
            padding: '12px', 
            backgroundColor: '#2ecc71', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            fontSize: '1rem', 
            fontWeight: 'bold',
            marginTop: '10px'
          }}>
            Entrar
          </button>
        </form>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        {/* ENLACE AL REGISTRO */}
        <p style={{ marginTop: '20px', color: '#555' }}>
          ¿No tienes cuenta? <br/>
          <Link to="/register" style={{ color: '#3498db', fontWeight: 'bold' }}>
            Regístrate aquí
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;