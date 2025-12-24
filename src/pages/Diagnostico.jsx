import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'; // <--- IMPORTANTE: El lector
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
      alert(" Acceso denegado: Debes iniciar sesión.");
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

      // ENVIAMOS LA FOTO AL SERVIDOR
      const respuesta = await axios.post('https://agri-salud-backend.onrender.com/api/diagnostico', formData, {
        headers: { 
            'Content-Type': 'multipart/form-data',
            'auth-token': token 
        }
      });

      // Guardamos la respuesta tal cual llega (Texto Markdown)
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
      
      <h2 style={{ textShadow: '2px 2px 4px #000', color: 'white' }}>Doctor de Plantas 🌿</h2>
      <p style={{ textShadow: '1px 1px 2px #000', color: '#eee' }}>Sube una foto de la hoja afectada para recibir un diagnóstico completo.</p>

      <div style={{ background: 'rgba(255,255,255,0.9)', padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
          
          {/* VISTA PREVIA */}
          {preview && (
            <div style={{ marginBottom: '15px' }}>
              <img src={preview} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }} />
            </div>
          )}

          {/* BOTÓN DE SUBIDA */}
          <label style={{ 
              backgroundColor: '#2ecc71', color: 'white', padding: '12px 25px', 
              borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold', display: 'inline-block'
          }}>
            📸 Tomar / Subir Foto
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
          </label>

          {/* BOTÓN DE ANALIZAR */}
          {imagen && !cargando && (
             <button onClick={handleSubmit} style={{ 
                 display: 'block', margin: '20px auto 0', padding: '10px 30px', 
                 backgroundColor: '#3498db', color: 'white', border: 'none', 
                 borderRadius: '5px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold'
             }}>
                 🔍 Analizar Planta
             </button>
          )}

          {cargando && <p style={{ marginTop: '15px', fontWeight: 'bold', color: '#555' }}>Analizando cultivo... ⏳</p>}
      </div>

      {/* === ZONA DE RESULTADO (LECTOR DE MARKDOWN) === */}
      {resultado && (
        <div style={{ 
            textAlign: 'left', 
            background: 'rgba(255, 255, 255, 0.95)', 
            padding: '30px', 
            borderRadius: '15px', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            color: '#2c3e50',
            lineHeight: '1.6'
        }}>
            {/* ESTA ES LA CLAVE: ReactMarkdown lee el texto bonito */}
            <ReactMarkdown>{resultado}</ReactMarkdown>
        </div>
      )}

    </div>
  );
}

export default Diagnostico;