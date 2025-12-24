import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

function Diagnostico() {
  const navigate = useNavigate();

  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);

  // ===  GUARDIA DE SEGURIDAD ===
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
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
      const token = localStorage.getItem('token');
      const respuesta = await axios.post('https://agri-salud-backend.onrender.com/api/diagnostico', formData, {
        headers: { 
            'Content-Type': 'multipart/form-data',
            'auth-token': token 
        }
      });
      setResultado(respuesta.data.resultado);
      
    } catch (error) {
      console.log(error);
      alert("Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
      
      <h2 style={{ textShadow: '2px 2px 4px #000', color: 'white', marginBottom: '30px' }}>Doctor de Plantas 🌿</h2>

      {/* --- CAMBIO AQUÍ ---
          Quitamos el background blanco, el padding y el borde.
          Solo dejamos un margen inferior para separarlo del resultado.
      */}
      <div style={{ marginBottom: '30px' }}>
          
          {/* VISTA PREVIA */}
          {preview && (
            <div style={{ marginBottom: '20px' }}>
              <img src={preview} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '350px', borderRadius: '15px', boxShadow: '0 8px 20px rgba(0,0,0,0.5)', border: '3px solid white' }} />
            </div>
          )}

          {/* BOTÓN DE SUBIDA */}
          <label style={{ 
              backgroundColor: '#2ecc71', color: 'white', padding: '12px 30px', fontSize: '1.1rem',
              borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', display: 'inline-block',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)', transition: 'all 0.3s ease'
          }}>
            📸 Tomar / Subir Foto
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
          </label>

          {/* BOTÓN DE ANALIZAR */}
          {imagen && !cargando && (
             <button onClick={handleSubmit} style={{ 
                 display: 'block', margin: '20px auto 0', padding: '12px 40px', 
                 backgroundColor: '#3498db', color: 'white', border: 'none', 
                 borderRadius: '30px', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold',
                 boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
             }}>
                 🔍 Analizar Planta
             </button>
          )}

          {/* --- CAMBIO AQUÍ ---
              Cambiamos el color del texto de carga a BLANCO con sombra negra
              para que se lea bien sobre el fondo oscuro.
          */}
          {cargando && <p style={{ marginTop: '20px', fontWeight: 'bold', color: 'white', fontSize: '1.2rem', textShadow: '1px 1px 3px black' }}>Analizando cultivo... ⏳</p>}
      </div>

      {/* === ZONA DE RESULTADO === */}
      {resultado && (
        <div style={{ 
            textAlign: 'left', 
            background: 'rgba(255, 255, 255, 0.95)', 
            padding: '30px', 
            borderRadius: '20px', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            color: '#2c3e50',
            lineHeight: '1.7',
            backdropFilter: 'blur(5px)'
        }}>
            <ReactMarkdown>{resultado}</ReactMarkdown>
        </div>
      )}

    </div>
  );
}

export default Diagnostico;