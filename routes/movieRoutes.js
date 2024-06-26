const express = require("express")
const router = express.Router()
const movieController = require("../controllers/movieController.js")

router.get("/movies", movieController.getAllMovies)
router.post("/movies", movieController.createMovie)


module.exports = router