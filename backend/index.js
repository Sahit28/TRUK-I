const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/camiones', (req, res) => {
  res.json([{ patente: 'ABC123', empresa: 'Transporte S.A.', chofer: 'Juan' }]);
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});