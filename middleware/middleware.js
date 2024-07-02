const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Token no proporcionado"
    });
  }

  const tokenSinBearer = token.split(' ')[1];

  jwt.verify(tokenSinBearer, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Token no válido"
      });
    }

    req.usuario = decoded;
    next();
  });
};
const esUsuario = (req, res, next) => {
  if (req.usuario && req.usuario.role === 'usuario') {
    next();
  } else {
    res.status(403).json({ mensaje: "Acceso denegado: Se requiere rol de usuario" });
  }
};

const esAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.role === 'admin') {
    next();
  } else {
    res.status(403).json({ mensaje: "Acceso denegado: Se requiere rol de administrador" });
  }
};

module.exports = {
  verificarToken,
  esUsuario,
  esAdmin
}