const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController.js')

router.get("/usuarios", authController.getAllUsuarios)
router.post("/registrar", authController.registrarUsuario)
router.post("/login", authController.iniciarSesion)

module.exports = router