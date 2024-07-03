const db = require("../db/db.js");

const getAllPaquetes = (req, res) => {
  const sql = `
    SELECT
      p.id,
      p.nombre,
      p.descripcion,
      p.costo,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', o.id,
          'usuario_id', o.usuario_id,
          'comentario', o.comentario,
          'calificacion', o.calificacion,
          'fecha', o.fecha,
          'usuario', JSON_OBJECT(
            'id', u.id,
            'nombre', u.nombre,
            'apellido', u.apellido,
            'email', u.email
          )
        )
      ) AS opiniones,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', r.id,
          'usuario_id', r.usuario_id,
          'fecha', r.fecha,
          'cantidad', r.cantidad,
          'pagada', r.pagada,
          'usuario', JSON_OBJECT(
            'id', ru.id,
            'nombre', ru.nombre,
            'apellido', ru.apellido,
            'email', ru.email
          )
        )
      ) AS reservas
    FROM paquetes p
    LEFT JOIN opiniones o ON p.id = o.paquete_id
    LEFT JOIN usuarios u ON o.usuario_id = u.id
    LEFT JOIN reservas r ON p.id = r.paquete_id
    LEFT JOIN usuarios ru ON r.usuario_id = ru.id
    GROUP BY p.id, p.nombre, p.descripcion, p.costo;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error al recuperar los paquetes de la base de datos",
      });
    }

    res.status(200).json({
      success: true,
      data: results,
    });
  });
}

const getPaqueteById = (req, res) => {
  const { id } = req.params;
  
  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "ID del paquete inválido"
    });
  }

  const sql = `
    SELECT
      p.id,
      p.nombre,
      p.descripcion,
      p.costo,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', o.id,
          'usuario_id', o.usuario_id,
          'comentario', o.comentario,
          'calificacion', o.calificacion,
          'fecha', o.fecha,
          'usuario', JSON_OBJECT(
            'id', u.id,
            'nombre', u.nombre,
            'apellido', u.apellido,
            'email', u.email
          )
        )
      ) AS opiniones,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', r.id,
          'usuario_id', r.usuario_id,
          'fecha', r.fecha,
          'cantidad', r.cantidad,
          'pagada', r.pagada,
          'usuario', JSON_OBJECT(
            'id', ru.id,
            'nombre', ru.nombre,
            'apellido', ru.apellido,
            'email', ru.email
          )
        )
      ) AS reservas
    FROM paquetes p
    LEFT JOIN opiniones o ON p.id = o.paquete_id
    LEFT JOIN usuarios u ON o.usuario_id = u.id
    LEFT JOIN reservas r ON p.id = r.paquete_id
    LEFT JOIN usuarios ru ON r.usuario_id = ru.id
    WHERE p.id = ?
    GROUP BY p.id, p.nombre, p.descripcion, p.costo;
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error al recuperar el paquete"
      });
    }

    res.status(200).json({
      success: true,
      data: results[0] || null
    });
  });
}

const createPaquete = (req, res) => {
  const {nombre, descripcion, costo, imagen} = req.body

  const sql = `
  INSERT INTO paquetes(
  nombre,
  descripcion,
  costo,
  imagen
  ) VALUES (?,?,?,?)
  `
  db.query(sql, [nombre, descripcion, costo, imagen], (err, results) => {
    if(err){
      return res.status(500).json({
        success: false,
        message: "Error en la base de datos"
      })
    }

    res.status(201).json({
      success:true,
      results
    })
  })
}

const deletePaquete = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID no válido"
    });
  }

  const deleteOpinionesSql = 'DELETE FROM opiniones WHERE paquete_id = ?';
  db.query(deleteOpinionesSql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "No se pudieron eliminar las opiniones del paquete"
      });
    }

    const deleteReservasSql = 'DELETE FROM reservas WHERE paquete_id = ?';
    db.query(deleteReservasSql, [id], (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "No se pudieron eliminar las reservas del paquete"
        });
      }

      const deletePaqueteSql = 'DELETE FROM paquetes WHERE id = ?';
      db.query(deletePaqueteSql, [id], (err, results) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "No es posible eliminar el paquete"
          });
        }

        res.status(200).json({
          success: true,
          message: "El paquete se eliminó"
        });
      });
    });
  });
}



module.exports = { 
  getAllPaquetes,
  getPaqueteById,
  createPaquete,
  deletePaquete
 }
