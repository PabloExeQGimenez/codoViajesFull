const express = require("express")
const router = express.Router()
const movieController = require("../controllers/movieController.js")

//movies/
router.get("/movies", movieController.getAllMovies)
router.post("/movies", movieController.createMovie)


module.exports = router