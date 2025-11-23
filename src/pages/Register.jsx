import { useState } from 'react';
import axios from 'axios'; // Importamos la herramienta para hablar con el backend

function Register() {
  // Aquí guardamos lo que el usuario escribe
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  });

  const [mensaje, setMensaje] = useState('');

  // Función que actualiza los datos cuando escribes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función que se ejecuta al dar clic en "Registrarse"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que se recargue la página
    try {
      // Aquí conectamos con TU servidor backend
     const respuesta = await axios.post('https://agri-salud-backend.onrender.com/api/user/register', formData);
console.log(respuesta); // <--- Al usarla aquí, el error desaparecerá
      
      setMensaje('¡Agricultor registrado con éxito! Ahora puedes iniciar sesión.');
    } catch (error) {
      setMensaje('Hubo un error: ' + (error.response?.data || 'Intenta de nuevo'));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Registro Agri-Salud 🌱</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Nombre:</label><br/>
          <input 
            type="text" 
            name="nombre" 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label>Correo:</label><br/>
          <input 
            type="email" 
            name="email" 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Contraseña:</label><br/>
          <input 
            type="password" 
            name="password" 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Registrarse
        </button>
      </form>
      
      {mensaje && <p style={{ color: 'green', marginTop: '10px' }}>{mensaje}</p>}
    </div>
  );
}

export default Register;