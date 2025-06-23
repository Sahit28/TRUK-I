const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000;
const camiones = [];

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/api/camiones', (req, res) => {
  res.json(camiones);
});

app.post('/api/camiones', (req, res) => {
  const nuevoCamion = req.body;
  console.log('📥 Camión recibido:', nuevoCamion);
  nuevoCamion.fecha = new Date().toISOString();
  camiones.push(nuevoCamion);
  res.status(201).json({ message: 'Camión registrado', camion: nuevoCamion });
});

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});