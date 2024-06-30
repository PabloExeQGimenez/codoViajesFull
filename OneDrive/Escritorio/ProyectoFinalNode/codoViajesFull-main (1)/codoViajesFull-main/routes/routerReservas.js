
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ruta para guardar una nueva reserva
router.post('/reservas', (req, res) => {
  // Validar y obtener datos de la solicitud
  const { nombre, fecha } = req.body;

  // Ejemplo de cómo podrías crear una nueva reserva en la base de datos
  const nuevaReserva = { nombre, fecha }; // Asume que tienes estos campos en la solicitud

  // Consulta SQL para insertar una nueva reserva
  const sql = 'INSERT INTO reservas (nombre, fecha) VALUES (?, ?)';

  // Ejecutar la consulta con los datos proporcionados
  connection.query(sql, [nuevaReserva.nombre, nuevaReserva.fecha], (err, result) => {
    if (err) {
      console.error('Error al guardar reserva:', err);
      return res.status(500).json({ error: 'Error al guardar reserva' });
    }
    
    console.log('Reserva guardada correctamente');
    return res.status(201).json({ message: 'Reserva guardada correctamente' });
  });
});

module.exports = router;
