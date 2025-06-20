const mongoose = require('mongoose');
const Camion = require('./models/Camion'); // Asegúrate que el path es correcto

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar a MongoDB', err));

const camionSchema = new mongoose.Schema({
  patente: { type: String, required: true },
  empresa: { type: String, required: true },
  cofer: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Camion', camionSchema);

app.post('/api/camiones', async (req, res) => {
  try {
    const nuevoCamion = new Camion(req.body);
    await nuevoCamion.save();
    res.status(201).json({ message: 'Camión registrado', camion: nuevoCamion });
  } catch (error) {
    console.error('❌ Error al guardar camión:', error);
    res.status(500).json({ error: 'Error al registrar camión' });
  }
});

app.get('/api/camiones', async (req, res) => {
  const camiones = await Camion.find().sort({ fecha: -1 });
  res.json(camiones);
});

VITE_API_URL=http://localhost:5000/api
