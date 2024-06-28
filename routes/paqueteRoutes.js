const express = require('express')
const router = express.Router()
const paqueteController = require("../controllers/paqueteController.js")

router.get("/paquetes", paqueteController.getAllPaquetes)
router.get("/paquetes/:id", paqueteController.getPaqueteById)
router.post("/paquetes", paqueteController.createPaquete)

module.exports = router