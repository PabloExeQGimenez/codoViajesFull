const db = require('../db/db.js')

const getAllOpiniones = (req, res) => {
  const sql = 'SELECT * FROM opiniones'

  db.query(sql, (err, results) => {
    if(err){
      return res.status(500).json({
        success: false,
        message:"Error al recuperar las opiniones de la base de datos"
      })
    }

    res.status(200).json({
      success: true,
      results
    })

  })
}

const createOpinion = (req, res) => {
  const {usuario_id, paquete_id, comentario, calificacion, fecha} = req.body

  if(!usuario_id || !paquete_id || !comentario || !calificacion || !fecha){
    return res.status(400).json({
      success: false,
      message: "faltan datos"
    })
  }

  const sql = 'INSERT INTO opiniones (usuario_id, paquete_id, comentario, calificacion, fecha) VALUES(?,?,?,?,?)'
  db.query(sql, [usuario_id, paquete_id, comentario, calificacion, fecha], (err, results) => {
    if(err){
      return res.status(500).json({
        success: false,
        message: "error al insertar la opinion"
      })
    }

    res.status(201).json({
      success: true,
      message: "se creo la opinion",
      data: {
        id: results.insertId,
        usuario_id,
        paquete_id,
        comentario,
        calificacion,
        fecha
      }
    })
  })
}

module.exports = {
  getAllOpiniones,
  createOpinion
}