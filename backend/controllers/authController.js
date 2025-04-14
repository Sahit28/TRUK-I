const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const valido = await bcrypt.compare(password, user.password);
    if (!valido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user._id, nombre: user.nombre, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, user: { nombre: user.nombre, email: user.email, rol: user.rol } });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error en login' });
  }
};

exports.registrar = async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  try {
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ mensaje: 'Usuario ya existe' });

    const hashed = await bcrypt.hash(password, 10);
    const nuevo = new User({ nombre, email, password: hashed, rol });
    await nuevo.save();

    res.status(201).json({ mensaje: 'Usuario registrado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error en registro' });
  }
};
