const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;
const SECRET_KEY = 'your_secret_key';

app.use(cors());
app.use(express.json());

let camiones = [];

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'No token provided.' });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
};

// Ruta para iniciar sesión y obtener un token
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Validación básica de usuario (esto debe reemplazarse con una base de datos)
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ id: username }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ error: 'Credenciales inválidas.' });
});

// Ruta protegida para registrar camiones
app.post('/api/camiones', verifyToken, (req, res) => {
  const { patente, chofer, empresa, fecha } = req.body;

  if (!patente || !/^[A-Z]{3}\d{3}$/.test(patente)) {
    return res.status(400).json({ error: 'Patente inválida. Debe tener el formato ABC123.' });
  }

  if (!chofer || !empresa || !fecha) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  const camion = { patente, chofer, empresa, fecha };
  camiones.push(camion);
  res.status(201).json(camion);
});

// Ruta protegida para obtener camiones
app.get('/api/camiones', verifyToken, (req, res) => {
  res.json(camiones);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
