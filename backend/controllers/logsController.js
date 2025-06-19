const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Log = require('../models/Log');

const app = express();
const port = process.env.PORT || 5000;

const camiones = [];

app.use(cors({
  origin: 'http://localhost:5173', // El puerto del frontend
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/api/camiones', (req, res) => {
  res.json(camiones);
});

app.post('/api/camiones', (req, res) => {
  const nuevoCamion = req.body;
  console.log('📥 Camión recibido:', nuevoCamion); // ← Esta línea muestra si llega

  nuevoCamion.fecha = new Date().toISOString();
  camiones.push(nuevoCamion);
  res.status(201).json({ message: 'Camión registrado', camion: nuevoCamion });
});

exports.obtenerLogs = async (req, res) => {
  const { desde, hasta, accion } = req.query;

  const filtro = {};
  if (desde || hasta) {
    filtro.fecha = {};
    if (desde) filtro.fecha.$gte = new Date(desde);
    if (hasta) filtro.fecha.$lte = new Date(hasta);
  }
  if (accion) {
    filtro.accion = new RegExp(accion, 'i');
  }

  try {
    const logs = await Log.find(filtro).sort({ fecha: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener logs' });
  }
};

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
