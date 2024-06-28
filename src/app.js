const express = require('express')
const movieRoutes = require("../routes/movieRoutes")
const authRoutes = require("../routes/authRoutes")
const protectedRoutes = require('../routes/protectedRoutes')
const reservaRoutes = require('../routes/reservaRoutes')
const opinionRoutes = require('../routes/opinionRoutes')
const paqueteRoutes = require('../routes/paqueteRoutes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static("public"))

app.use("/api", authRoutes)
app.use('/api', protectedRoutes)
app.use('/api', reservaRoutes)
app.use('/api', opinionRoutes)
app.use('/api', paqueteRoutes)

app.listen(PORT, () => {
  console.log(`Servidor montado en http://localhost:${PORT}`)
})