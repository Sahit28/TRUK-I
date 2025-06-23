const mongoose = require('mongoose');

const camionSchema = new mongoose.Schema({
  patente: { type: String, required: true },
  empresa: { type: String, required: true },
  cofer:   { type: String, required: true },
  fecha:   { type: Date, default: Date.now }
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
