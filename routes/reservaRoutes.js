const express = require('express')
const router = express.Router()
const reservaController = require('../controllers/reservaController.js')

router.get("/reservas", reservaController.getAllReservas)
router.get("/reservas/:id", reservaController.getReservaById)
router.post("/reservas", reservaController.createReserva)
router.put("/reservas/:id", reservaController.updateReserva)
router.delete("/reservas/:id", reservaController.deleteReserva)
router.put('/reservas/:id/pagar', reservaController.buyReserva)

module.exports = router