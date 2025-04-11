import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'

function App() {
  const [activeTab, setActiveTab] = useState('registrar')
  const [formData, setFormData] = useState({ patente: '', empresa: '', chofer: '' })
  const [camiones, setCamiones] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3001/camiones', formData)
      setFormData({ patente: '', empresa: '', chofer: '' })
      fetchCamiones()
    } catch (error) {
      console.error('Error al registrar camión:', error)
    }
  }

  const fetchCamiones = async () => {
    try {
      const res = await axios.get('http://localhost:3001/camiones')
      setCamiones(res.data)
    } catch (error) {
      console.error('Error al obtener camiones:', error)
    }
  }

  useEffect(() => {
    if (activeTab === 'ver') fetchCamiones()
  }, [activeTab])

  return (
    <div className="container">
      <div className="tabs">
        <button className={activeTab === 'registrar' ? 'active' : ''} onClick={() => setActiveTab('registrar')}>Registrar</button>
        <button className={activeTab === 'ver' ? 'active' : ''} onClick={() => setActiveTab('ver')}>Ver Camiones</button>
      </div>

      {activeTab === 'registrar' && (
        <form onSubmit={handleSubmit} className="form">
          <input type="text" name="patente" placeholder="Patente" value={formData.patente} onChange={handleChange} required />
          <input type="text" name="empresa" placeholder="Empresa" value={formData.empresa} onChange={handleChange} required />
          <input type="text" name="chofer" placeholder="Chofer" value={formData.chofer} onChange={handleChange} required />
          <button type="submit">Registrar</button>
        </form>
      )}

      {activeTab === 'ver' && (
        <table>
          <thead>
            <tr>
              <th>Patente</th>
              <th>Empresa</th>
              <th>Chofer</th>
            </tr>
          </thead>
          <tbody>
            {camiones.map((c, i) => (
              <tr key={i}>
                <td>{c.patente}</td>
                <td>{c.empresa}</td>
                <td>{c.chofer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App