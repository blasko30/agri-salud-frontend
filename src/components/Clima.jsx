import { useState, useEffect } from 'react';
import axios from 'axios';

function Clima() {
  const [clima, setClima] = useState(null);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  // Tu API Key (La dejé igual, está correcta)
  const API_KEY = '305cb812ac2965f4cc3dc680325414a5'; 

  useEffect(() => {
    // 1. Pedimos permiso al navegador para ver la ubicación GPS
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        obtenerClima(lat, lon);
      },
      // CORRECCIÓN 1: Quitamos el (err) porque no lo usábamos
      () => {
        setError("Necesitamos tu ubicación para darte el clima local.");
        setCargando(false);
      }
    );
  }, []);

  const obtenerClima = async (lat, lon) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;
      const respuesta = await axios.get(url);
      setClima(respuesta.data);
    } 
    // CORRECCIÓN 2: Quitamos (err) del catch
    catch {
      setError("Error al conectar con el servicio meteorológico.");
    } finally {
      setCargando(false);
    }
  };

  if (cargando) return <div style={{color: 'white', fontWeight: 'bold'}}>Cargando clima... 🌤️</div>;
  if (error) return <div style={{color: '#ff6b6b', fontWeight: 'bold', background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '10px'}}>{error}</div>;

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.2)', // Efecto vidrio
      backdropFilter: 'blur(10px)',
      padding: '20px',
      borderRadius: '15px',
      color: 'white',
      maxWidth: '300px',
      margin: '20px auto',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      textAlign: 'center',
      boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
    }}>
      {clima && (
        <>
          <h3 style={{margin: '0 0 10px 0', textShadow: '1px 1px 2px black'}}>📍 {clima.name}</h3>
          
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <img 
              src={`http://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`} 
              alt="Icono clima" 
              style={{width: '80px', filter: 'drop-shadow(2px 4px 6px black)'}}
            />
            <span style={{fontSize: '3rem', fontWeight: 'bold', textShadow: '2px 2px 4px black'}}>
              {Math.round(clima.main.temp)}°
            </span>
          </div>
          
          <p style={{textTransform: 'capitalize', fontSize: '1.2rem', marginTop: '-10px', textShadow: '1px 1px 2px black'}}>
            {clima.weather[0].description}
          </p>
          
          <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '15px', fontSize: '0.9rem', textShadow: '1px 1px 2px black'}}>
            <div>
              💧 Humedad <br/> 
              <strong>{clima.main.humidity}%</strong>
            </div>
            <div>
              💨 Viento <br/> 
              <strong>{clima.wind.speed} m/s</strong>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Clima;