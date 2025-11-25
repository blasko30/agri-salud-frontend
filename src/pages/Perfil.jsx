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
      } catch (err) { console.log(err); }
    };
    cargarPerfil();
  }, []);

  const handleChange = (e) => { setDatos({ ...datos, [e.target.name]: e.target.value }); };
  
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
      await axios.put('https://agri-salud-backend.onrender.com/api/usuario', formData, {
        headers: { 'auth-token': token, 'Content-Type': 'multipart/form-data' }
      });
      setMensaje('¡Perfil actualizado! ✅');
    } catch  { setMensaje('Error al actualizar ❌'); }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ background: 'rgba(255,255,255,0.95)', padding: '30px', borderRadius: '20px' }}>
        <h2 style={{ color: '#2c3e50', margin: 0 }}>Mi Perfil 👨‍🌾</h2>
        
        <div style={{ margin: '20px auto', width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '4px solid #2ecc71' }}>
            <img src={fotoUrl || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        
        <label style={{ display: 'inline-block', padding: '8px 15px', background: '#3498db', color: 'white', borderRadius: '20px', cursor: 'pointer', marginBottom: '20px' }}>
            📷 Cambiar Foto
            <input type="file" accept="image/*" onChange={handleFotoChange} style={{ display: 'none' }} />
        </label>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
            <input type="text" name="nombre" value={datos.nombre} onChange={handleChange} placeholder="Nombre" style={{width: '100%', padding: '10px'}} />
            <input type="text" name="finca" value={datos.finca} onChange={handleChange} placeholder="Nombre de tu Finca o Jardín" style={{width: '100%', padding: '10px'}} />
            <button type="submit" style={{ padding: '12px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>Guardar</button>
        </form>
        {mensaje && <p>{mensaje}</p>}
      </div>
    </div>
  );
}
export default Perfil;