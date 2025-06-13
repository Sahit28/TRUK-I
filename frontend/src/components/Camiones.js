import React, { useEffect, useState } from "react";
import axios from "axios";

function Camiones() {
  const [camiones, setCamiones] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/camiones")
      .then(res => setCamiones(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Lista de Camiones</h2>
      <ul>
        {camiones.map((c, i) => (
          <li key={i}>{c.patente} - {c.empresa}</li>
        ))}
      </ul>
    </div>
  );
}

export default Camiones;

