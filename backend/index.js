require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 5000;

const camiones = []; // almacenamiento en memoria (temporal)

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Seguridad básica
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self' http://localhost:5173");
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  next();
});

// Rutas
app.get('/api/camiones', (req, res) => {
  res.json(camiones);
});

app.post('/api/camiones', (req, res) => {
  const nuevoCamion = req.body;
  nuevoCamion.fecha = new Date().toISOString();
  camiones.push(nuevoCamion);
  res.status(201).json({ message: 'Camión registrado', camion: nuevoCamion });
});

// Servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
