import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://agri-salud-backend.onrender.com/api/user/register', formData);
      setMensaje('¡Usuario creado! Redirigiendo al login...');
      setError('');
      
      // Esperamos 2 segundos y lo mandamos al login automáticamente
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch {
      setError('Error: El correo ya existe o los datos son inválidos');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto' }}>
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
        textAlign: 'center'
      }}>

        <h2 style={{ color: '#2c3e50', marginTop: 0 }}>Crear Cuenta 🌱</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', textAlign: 'left', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>Nombre:</label>
            <input type="text" name="nombre" onChange={handleChange} required style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}/>
          </div>
          
          <div>
            <label style={{ display: 'block', textAlign: 'left', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>Correo:</label>
            <input type="email" name="email" onChange={handleChange} required style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}/>
          </div>

          <div>
            <label style={{ display: 'block', textAlign: 'left', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>Contraseña:</label>
            <input type="password" name="password" onChange={handleChange} required style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}/>
          </div>

          <button type="submit" style={{ padding: '12px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1rem', fontWeight: 'bold', marginTop: '10px' }}>
            Registrarse
          </button>
        </form>
        
        {mensaje && <p style={{ color: 'green', marginTop: '10px', fontWeight: 'bold' }}>{mensaje}</p>}
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        <p style={{ marginTop: '20px', color: '#555' }}>
          ¿Ya tienes cuenta? <br/>
          <Link to="/login" style={{ color: '#2ecc71', fontWeight: 'bold' }}>
            Inicia Sesión aquí
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;