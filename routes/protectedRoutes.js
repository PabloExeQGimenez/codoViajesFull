const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/middleware.js');
const { getAllMovies, createMovie } = require('../controllers/movieController.js');

// Ruta protegida para obtener todas las películas
router.get('/movies', verificarToken, getAllMovies);

// Ruta protegida para crear una nueva película
router.post('/movies', verificarToken, createMovie);

module.exports = router;
