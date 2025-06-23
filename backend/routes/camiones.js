const express = require('express');
const router = express.Router();
const Camion = require('../models/Camion');

// Obtener todos los camiones
router.get('/', async (req, res) => {
  try {
    const camiones = await Camion.find();
    res.json(camiones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener camiones' });
  }
});

// Registrar un nuevo camión
router.post('/', async (req, res) => {
  try {
    const nuevoCamion = new Camion(req.body);
    await nuevoCamion.save();
    res.status(201).json({ message: 'Camión registrado', camion: nuevoCamion });
  } catch (error) {
    console.error('❌ Error al guardar camión:', error);
    res.status(500).json({ error: 'Error al registrar camión' });
  }
});

module.exports = router;


