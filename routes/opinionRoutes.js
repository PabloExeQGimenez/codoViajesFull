const express = require('express')
const router = express.Router()
const opinionController = require('../controllers/opinionController.js')

router.get("/opiniones", opinionController.getAllOpiniones)
router.post("/opiniones", opinionController.createOpinion)

module.exports = router