const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let camiones = [
  { id: 1, patente: "ABC123", chofer: "Juan Pérez", carga: "Granos" },
  { id: 2, patente: "XYZ789", chofer: "María Gómez", carga: "Arena" },
];

// Ruta para obtener todos los camiones
app.get("/camiones", (req, res) => {
  res.json(camiones);
});

// Ruta para agregar un camión
app.post("/camiones", (req, res) => {
  const nuevoCamion = {
    id: camiones.length + 1,
    ...req.body,
  };
  camiones.push(nuevoCamion);
  res.status(201).json(nuevoCamion);
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});