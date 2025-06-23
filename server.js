const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const camionesRoutes = require('./routes/camiones');
const authRoutes = require('./routes/auth');
const logsRoutes = require('./routes/logs');

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conexión exitosa a MongoDB'))
.catch((err) => console.error('❌ Error al conectar a MongoDB:', err));

// Configuración de CORS
const corsOptions = {
  origin: 'https://tu-frontend.vercel.app', // Cambiar por URL real
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

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
