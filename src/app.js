const express = require('express')
const movieRoutes = require("../routes/movieRoutes")
const authRoutes = require("../routes/authRoutes")
const protectedRoutes = require('../routes/protectedRoutes');

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static("public"))

//app.use("/auth", authRoutes)

// app.use("/movies", movieRoutes)
app.use("/api", authRoutes)
app.use('/api', protectedRoutes)


app.listen(PORT, () => {
  console.log(`Servidor montado en http://localhost:${PORT}`)
})