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



module.exports = {
  getAllOpiniones
}