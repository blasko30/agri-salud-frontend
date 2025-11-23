import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para cambiar de página automáticamente

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
      const respuesta = await axios.post('https://agri-salud-backend.onrender.com/api/user/login', formData);
      
      // ¡AQUÍ ESTÁ LA CLAVE! 
      // Guardamos el token en el navegador (LocalStorage)
      localStorage.setItem('token', respuesta.data.token);
      localStorage.setItem('plan', respuesta.data.plan); // Guardamos si es Free o Premium
      
      alert('¡Bienvenido de nuevo!');
      navigate('/'); // Nos lleva a la página principal (que haremos luego)
      
  } catch (err) {
  console.log(err); // <--- Al agregar esta línea, el error desaparece
  setError('Correo o contraseña incorrectos');
}
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Iniciar Sesión 🚜</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Correo:</label><br/>
          <input type="email" name="email" onChange={handleChange} required style={{ width: '100%', padding: '8px' }}/>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Contraseña:</label><br/>
          <input type="password" name="password" onChange={handleChange} required style={{ width: '100%', padding: '8px' }}/>
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
          Entrar
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;