const db = require("../db/db")

const getAllMovies = (req, res) => {
  const sql = 'SELECT * FROM movies'
  db.query(sql, (err, results) => {
    if (err) throw err
    res.json(results)
  })
}

module.exports = {getAllMovies}