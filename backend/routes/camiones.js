const express = require('express');
const router = express.Router();
const {
  obtenerTodos,
  registrar,
  resumen,
  estadistica
} = require('../controllers/camionesController');
const { verificarToken } = require('../middleware/authMiddleware');

router.get('/', verificarToken, obtenerTodos);
router.post('/', verificarToken, registrar);
router.get('/resumen', verificarToken, resumen);
router.get('/estadistica', verificarToken, estadistica);

module.exports = router;

