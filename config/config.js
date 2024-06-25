require('dotenv').config(); // Cargar variables de entorno desde .env

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'default_secret',
};