const express = require('express');
const router = express.Router();
const { login, registrar } = require('../controllers/authController');

router.post('/login', login);
router.post('/register', registrar);

module.exports = router;

