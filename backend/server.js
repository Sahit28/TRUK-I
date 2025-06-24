require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const camionesRoutes = require('./routes/camiones');
const authRoutes = require('./routes/auth');
const logsRoutes = require('./routes/logs');

const app = express();
const PORT = process.env.PORT || 5000;

// Conexión a MongoDB (agregado justo antes de los middlewares)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conexión exitosa a MongoDB'))
.catch((err) => console.error('❌ Error al conectar a MongoDB:', err));

// Configuración CORS
const corsOptions = {
  origin: 'http://localhost:5173', // O reemplaza por tu dominio de producción
  credentials: true
};
app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use('/api/camiones', camionesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/logs', logsRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('🟢 Backend operativo');
});

// Servidor escuchando
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

