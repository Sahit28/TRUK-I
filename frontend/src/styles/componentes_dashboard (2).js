// Archivo: src/components/Widgets.jsx
import React from 'react';

const Widgets = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-blue-100 p-4 rounded shadow">
        <h4 className="text-xl font-bold">📦 Total Registros</h4>
        <p className="text-2xl">123</p>
      </div>
      <div className="bg-green-100 p-4 rounded shadow">
        <h4 className="text-xl font-bold">🚛 Camiones Activos</h4>
        <p className="text-2xl">45</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded shadow">
        <h4 className="text-xl font-bold">🕒 Última Actualización</h4>
        <p className="text-2xl">Hace 3 min</p>
      </div>
    </div>
  );
};

export default Widgets;


// Archivo: src/components/RegistroDiarioChart.jsx
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Lun', registros: 10 },
  { name: 'Mar', registros: 40 },
  { name: 'Mié', registros: 30 },
  { name: 'Jue', registros: 50 },
  { name: 'Vie', registros: 20 },
  { name: 'Sáb', registros: 80 },
  { name: 'Dom', registros: 60 },
];

const RegistroDiarioChart = () => {
  return (
    <LineChart width={500} height={300} data={data}>
      <Line type="monotone" dataKey="registros" stroke="#007BFF" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default RegistroDiarioChart;


// Archivo: src/components/MapaCamiones.jsx
import React from 'react';

const MapaCamiones = () => {
  return (
    <div className="w-full h-72 bg-gray-200 rounded flex items-center justify-center">
      <p>🗺️ Aquí irá el mapa con la ubicación de camiones (integración futura)</p>
    </div>
  );
};

export default MapaCamiones;


// Archivo: src/components/ProbarAPI.jsx
import React from 'react';
import axios from 'axios';

const ProbarAPI = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const probarConexion = async () => {
    try {
      const res = await axios.get(`${apiUrl}/ping`);
      alert(`Éxito: ${res.data}`);
    } catch (err) {
      alert(`Error de conexión: ${err.message}`);
    }
  };

  return (
    <div className="mt-6">
      <button onClick={probarConexion} className="bg-indigo-600 text-white px-4 py-2 rounded">
        Probar conexión con backend
      </button>
    </div>
  );
};

export default ProbarAPI;
