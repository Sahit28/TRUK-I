import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const ListaCamiones = () => {
  const [camiones, setCamiones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCamiones = async () => {
      try {
        const res = await axios.get('/camiones');
        setCamiones(res.data);
      } catch (error) {
        console.error('Error al obtener camiones:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCamiones();
  }, []);

  if (loading) return <p>Cargando camiones...</p>;

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2 className="text-xl mb-4 font-bold">Camiones Registrados</h2>
      {camiones.length === 0 ? (
        <p>No hay camiones registrados.</p>
      ) : (
        <ul>
          {camiones.map((camion, idx) => (
            <li key={idx}>
              <strong>Patente:</strong> {camion.patente} | <strong>Empresa:</strong> {camion.empresa || camion.marca} | <strong>Chofer:</strong> {camion.cofer || camion.modelo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaCamiones;
