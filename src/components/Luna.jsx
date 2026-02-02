import { useState, useEffect } from 'react';

function Luna() {
  const [fase, setFase] = useState(null);

  useEffect(() => {
    const calcularFase = () => {
      const fecha = new Date();
      
      // Algoritmo simple para calcular la edad de la luna
      // Usamos una luna nueva conocida (Ej: 11 de Enero 2024) como referencia
      const lunaNuevaConocida = new Date('2024-01-11T11:57:00Z'); 
      const cicloLunar = 29.53058867; // Días que dura el ciclo

      // Calculamos la diferencia en días
      const diferenciaTiempo = fecha.getTime() - lunaNuevaConocida.getTime();
      const diasTotales = diferenciaTiempo / (1000 * 3600 * 24);
      
      // Vemos en qué día del ciclo (0 a 29) estamos hoy
      const diaDelCiclo = diasTotales % cicloLunar;

      let nombre = "";
      let icono = "";
      let iluminacion = 0;

      // Asignamos la fase según el día del ciclo
      if (diaDelCiclo < 1.8) {
        nombre = "Luna Nueva"; icono = "🌑"; iluminacion = 0;
      } else if (diaDelCiclo < 5.5) {
        nombre = "Creciente"; icono = "🌒"; iluminacion = 25;
      } else if (diaDelCiclo < 9.2) {
        nombre = "Cuarto Creciente"; icono = "🌓"; iluminacion = 50;
      } else if (diaDelCiclo < 12.9) {
        nombre = "Gibosa Creciente"; icono = "🌔"; iluminacion = 75;
      } else if (diaDelCiclo < 16.6) {
        nombre = "Luna Llena"; icono = "🌕"; iluminacion = 100;
      } else if (diaDelCiclo < 20.3) {
        nombre = "Gibosa Menguante"; icono = "🌖"; iluminacion = 75;
      } else if (diaDelCiclo < 24) {
        nombre = "Cuarto Menguante"; icono = "🌗"; iluminacion = 50;
      } else {
        nombre = "Menguante"; icono = "🌘"; iluminacion = 25;
      }

      setFase({ nombre, icono, iluminacion });
    };

    calcularFase();
  }, []);

  if (!fase) return <p style={{color: 'white'}}>Calculando...</p>;

  return (
    <div style={{ 
        background: 'rgba(0, 0, 0, 0.4)', // Un poco más oscuro para resaltar
        backdropFilter: 'blur(5px)',
        padding: '15px 25px', 
        borderRadius: '15px', 
        display: 'inline-block',
        marginTop: '20px',
        marginLeft: '15px', 
        color: 'white',
        border: '1px solid rgba(255,255,255,0.2)',
        verticalAlign: 'top',
        boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
    }}>
      <h3 style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '1px' }}>
        Fase Lunar
      </h3>
      
      <div style={{ fontSize: '3rem', margin: '5px 0', textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
        {fase.icono}
      </div>
      
      <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.1rem' }}>
        {fase.nombre}
      </p>
      
      {/* Barra de iluminación visual */}
      <div style={{ marginTop: '8px', background: 'rgba(255,255,255,0.2)', height: '4px', borderRadius: '2px', width: '100%' }}>
        <div style={{ 
            width: `${fase.iluminacion}%`, 
            background: '#f1c40f', 
            height: '100%', 
            borderRadius: '2px',
            boxShadow: '0 0 5px #f1c40f' 
        }}></div>
      </div>
      
    </div>
  );
}

export default Luna;