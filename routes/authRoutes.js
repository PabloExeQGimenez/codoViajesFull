const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController.js')
const {verificarToken, esUsuario, esAdmin} = require('../middleware/middleware.js')

router.get('/usuarios', authController.getAllUsuarios)
router.get('/usuarios/protegidos',verificarToken, esAdmin, authController.getAllUsuarios)

router.get('/usuarios/:id',  authController.getUsuarioById)
router.post('/registrar', authController.registrarUsuario)

router.post('/login', authController.iniciarSesion)

router.delete('/usuarios/:id', authController.deleteUsuario)
router.post('/admins', authController.registrarAdmin)

module.exports = router