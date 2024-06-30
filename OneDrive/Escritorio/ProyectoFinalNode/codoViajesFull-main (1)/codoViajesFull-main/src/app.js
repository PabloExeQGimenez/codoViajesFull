const express = require('express')
const movieRoutes = require("../routes/movieRoutes")
const PORT = 3000
const app = express()


app.use(express.json())
app.use(express.static("public"))
app.use("/movies", movieRoutes)

app.listen(PORT, () => {
  console.log(`Servidor montado en http://localhost:${PORT}`)
})