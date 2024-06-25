
const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

router.post('/compras', compraController.crearCompra);
router.get('/compras', compraController.obtenerCompras);
router.get('/compras/:id', compraController.obtenerCompraPorId);
router.put('/compras/:id', compraController.actualizarCompra);
router.delete('/compras/:id', compraController.eliminarCompra);

module.exports = router;

