// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta raíz para verificar el estado del servidor
app.get('/', (req, res) => {
  res.send('🚀 Backend del Registro de Camiones está funcionando correctamente.');
});

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/camiones', require('./routes/camiones'));
app.use('/api/logs', require('./routes/logs'));

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => console.error('❌ Error en MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));
