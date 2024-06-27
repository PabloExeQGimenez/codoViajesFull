const express = require('express')
const router = express.Router()
const compraController = require('../controllers/opinionController.js')

router.get("/opiniones", compraController.getAllOpiniones)


module.exports = router