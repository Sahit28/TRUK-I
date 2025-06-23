import React, { useState } from 'react';
import axios from '../services/api';

const RegistroCamion = () => {
  const [camion, setCamion] = useState({
    patente: '',
    empresa: '',
    cofer: ''
  });

  const handleChange = (e) => {
    setCamion({ ...camion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/camiones', camion);
      alert('✅ Camión registrado');
      setCamion({ patente: '', empresa: '', cofer: '' });
    } catch (error) {
      console.error('❌ Error al registrar camión:', error);
      alert('❌ Error al registrar camión');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="patente" placeholder="Patente" value={camion.patente} onChange={handleChange} required />
      <input name="empresa" placeholder="Empresa" value={camion.empresa} onChange={handleChange} required />
      <input name="cofer" placeholder="Cófer" value={camion.cofer} onChange={handleChange} required />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegistroCamion;