import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Diagnostico() {
  const navigate = useNavigate();

  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);

  // === 🛡️ GUARDIA DE SEGURIDAD ===
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("🔒 Acceso denegado: Debes iniciar sesión.");
      navigate('/login');
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setPreview(URL.createObjectURL(file));
      setResultado(null); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imagen) return alert("Por favor sube una foto primero");

    const formData = new FormData();
    formData.append('imagen', imagen); 

    setCargando(true);

    try {
      // 1. RECUPERAMOS EL TOKEN DEL BOLSILLO
      const token = localStorage.getItem('token');

      // 2. ENVIAMOS LA FOTO + EL TOKEN AL SERVIDOR
      // Asegúrate de que esta URL sea la de tu Render
      const respuesta = await axios.post('https://agri-salud-backend.onrender.com/api/diagnostico', formData, {
        headers: { 
            'Content-Type': 'multipart/form-data',
            'auth-token': token 
        }
      });

      setResultado(respuesta.data.resultado);
      
    } catch (error) {
      console.log(error);
      alert("Error al conectar con el servidor. Revisa tu conexión.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      
      <h2 style={{ textShadow: '2px 2px 4px #000' }}>Doctor de Plantas 🌿</h2>
      <p style={{ textShadow: '1px 1px 2px #000' }}>Sube una foto de la hoja afectada para recibir un diagnóstico completo.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        
        <label htmlFor="cameraInput" style={{ 
            backgroundColor: '#2ecc71', color: 'white', padding: '15px 30px', 
            borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}>
          📸 Tomar / Subir Foto
        </label>

        {/* Input sin 'capture' para permitir elegir Galería */}
        <input id="cameraInput" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />

        {preview && (
          <div style={{ marginTop: '10px' }}>
            <img src={preview} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '15px', border: '3px solid #fff' }} />
          </div>
        )}

        {preview && !cargando && (
          <button type="submit" style={{ 
              padding: '12px 25px', backgroundColor: '#3498db', color: 'white', 
              border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold'
          }}>
            🔍 Analizar Planta
          </button>
        )}

        {cargando && <p style={{fontSize: '18px', fontWeight: 'bold', color: '#fff', textShadow: '1px 1px 2px #000'}}>Analizando cultivo... ⏳</p>}

      </form>

      {/* RESULTADOS */}
      {resultado && (
        <div style={{ marginTop: '30px', padding: '25px', backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '15px', border: '1px solid #2ecc71', textAlign: 'left', color: '#333' }}>
          
          <h2 style={{ color: '#27ae60', marginTop: 0, borderBottom: '2px solid #a8e6cf', paddingBottom: '10px' }}>
            ✅ Diagnóstico: {resultado.nombre}
          </h2>
          
          <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6' }}>
            <strong>🔎 Descripción: </strong> {resultado.descripcion}
          </p>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#d35400', marginBottom: '10px' }}>⚠️ ¿Por qué sucede? (Causas)</h4>
            <ul style={{ paddingLeft: '25px', color: '#444' }}>
              {resultado.causas && resultado.causas.map((causa, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>{causa}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#2980b9', marginBottom: '10px' }}>🛠️ Solución recomendada</h4>
            <ul style={{ paddingLeft: '25px', color: '#444' }}>
              {resultado.tratamiento && resultado.tratamiento.map((solucion, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>{solucion}</li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}

export default Diagnostico;