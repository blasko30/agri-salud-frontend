import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Historial() {
  const [lista, setLista] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerHistorial = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('https://agri-salud-backend.onrender.com/api/diagnostico/historial', {
          headers: { 'auth-token': token }
        });
        setLista(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setCargando(false);
      }
    };
    obtenerHistorial();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ textShadow: '2px 2px 4px #000' }}>📂 Mis Diagnósticos</h2>
      
      {cargando && <p style={{color: 'white'}}>Cargando historial...</p>}

      {!cargando && lista.length === 0 && (
        <div style={{ background: 'rgba(255,255,255,0.9)', padding: '20px', borderRadius: '10px' }}>
          <p style={{ color: '#333' }}>Aún no tienes diagnósticos guardados.</p>
          <Link to="/diagnostico" style={{ color: '#2ecc71', fontWeight: 'bold' }}>¡Realiza el primero!</Link>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {lista.map((item) => (
          <div key={item._id} style={{ 
              background: 'rgba(255, 255, 255, 0.95)', 
              borderRadius: '15px', 
              overflow: 'hidden',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              textAlign: 'left'
          }}>
            <div style={{ background: '#2ecc71', padding: '10px 15px', color: 'white', fontWeight: 'bold' }}>
              {new Date(item.fecha).toLocaleDateString()}
            </div>
            <div style={{ padding: '15px' }}>
              <h3 style={{ color: '#2c3e50', margin: '0 0 10px 0' }}>{item.enfermedad}</h3>
              <p style={{ color: '#555', fontSize: '0.9rem' }}>{item.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Historial;