const db = require("../db/db")

const getAllMovies = (req, res) => {
  const sql = 'SELECT * FROM movies'

  db.query(sql, (err, resultado) => {
    if (err) {
      console.error("error al obtener las peliculas", err)
      return res.status(500).json({mesagge: "error al obtener las peliculas"})
    }
   
    res.status(200).json(resultado)
  })
}

const createMovie = (req, res) => {
  const {titulo} = req.body

  if(!titulo){
    return res.status(400).json({
      succes: false,
      mesagge: "ingrese el titulo de una pelicula"
    })
  }


  const sql = 'INSERT INTO movies (titulo) VALUES (?)'

  db.query(sql,[titulo], (err, resultado) => {
    if(err) {
      return res.status(500).json({
        mesagge: "Error al crear la pelicula"
      })      
    }
    res.status(201).json({
      mesagge: "pelicula creada con exito",
    })
  })
}

module.exports = {getAllMovies, createMovie}