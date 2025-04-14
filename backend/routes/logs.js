const express = require('express');
const router = express.Router();
const { obtenerLogs } = require('../controllers/logsController');
const { verificarToken, soloAdmin } = require('../middleware/authMiddleware');

router.get('/', verificarToken, soloAdmin, obtenerLogs);

module.exports = router;