import { useState, useEffect } from 'react';
import axios from 'axios';

function Perfil() {
  const [datos, setDatos] = useState({ nombre: '', finca: '', email: '' });
  const [foto, setFoto] = useState(null);
  const [fotoUrl, setFotoUrl] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const cargarPerfil = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('https://agri-salud-backend.onrender.com/api/usuario', {
          headers: { 'auth-token': token }
        });
        setDatos(res.data);
        if (res.data.foto) {
            setFotoUrl(`https://agri-salud-backend.onrender.com/uploads/${res.data.foto}`);
        }
      } catch (err) {
        console.log(err);
      }
    };
    cargarPerfil();
  }, []);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    setFotoUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('nombre', datos.nombre);
    formData.append('finca', datos.finca);
    if (foto) formData.append('foto', foto);

    try {
      const res = await axios.put('https://agri-salud-backend.onrender.com/api/usuario', formData, {
        headers: { 'auth-token': token, 'Content-Type': 'multipart/form-data' }
      });
      setDatos(res.data);
      setMensaje('¡Perfil actualizado con éxito! ✅');
    } catch  {
      setMensaje('Error al actualizar ❌');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      
      <div style={{ background: 'rgba(255,255,255,0.95)', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
        
        <h2 style={{ color: '#2c3e50', margin: 0 }}>Mi Perfil 👨‍🌾</h2>
        
        {/* FOTO DE PERFIL */}
        <div style={{ margin: '20px auto', width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '4px solid #2ecc71', position: 'relative' }}>
            <img 
                src={fotoUrl || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} 
                alt="Avatar" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
        </div>
        
        <label style={{ display: 'inline-block', padding: '8px 15px', background: '#3498db', color: 'white', borderRadius: '20px', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '20px' }}>
            📷 Cambiar Foto
            <input type="file" accept="image/*" onChange={handleFotoChange} style={{ display: 'none' }} />
        </label>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
            <div>
                <label style={{fontWeight: 'bold', color: '#555'}}>Nombre de Usuario:</label>
                <input type="text" name="nombre" value={datos.nombre} onChange={handleChange} style={{width: '100%', padding: '10px'}} />
            </div>
            
            {/* --- AQUÍ ESTÁ EL CAMBIO DE TEXTO --- */}
            <div>
                <label style={{fontWeight: 'bold', color: '#555'}}>Nombre de tu Finca o Jardín:</label>
                <input 
                    type="text" 
                    name="finca" 
                    value={datos.finca} 
                    onChange={handleChange} 
                    placeholder="Ej: Huerto Los Tomates o Mi Jardín" 
                    style={{width: '100%', padding: '10px'}} 
                />
            </div>
            {/* ----------------------------------- */}

            <div>
                <label style={{fontWeight: 'bold', color: '#999'}}>Correo (No editable):</label>
                <input type="text" value={datos.email} disabled style={{width: '100%', padding: '10px', background: '#eee', border: 'none'}} />
            </div>

            <button type="submit" style={{ padding: '12px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', marginTop: '10px', cursor: 'pointer' }}>
                Guardar Cambios
            </button>
        </form>

        {mensaje && <p style={{ marginTop: '15px', fontWeight: 'bold', color: '#2c3e50' }}>{mensaje}</p>}

      </div>
    </div>
  );
}

export default Perfil;