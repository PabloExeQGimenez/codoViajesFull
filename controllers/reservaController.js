const db = require("../db/db.js");

const getAllReservas = (req, res) => {
  const sql = `
  SELECT
    r.id,
    r.fecha,
    r.cantidad,
    r.pagada,
    JSON_OBJECT(
      'id', u.id,
      'nombre', u.nombre,
      'apellido', u.apellido,
      'email', u.email
    ) AS usuario,
    JSON_OBJECT(
      'id', p.id,
      'nombre', p.nombre,
      'descripcion', p.descripcion,
      'costo', p.costo
    ) AS paquete
  FROM reservas r
  LEFT JOIN usuarios u ON r.usuario_id = u.id
  LEFT JOIN paquetes p ON r.paquete_id = p.id;`

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error al obtener las reservas",
      });
    }

    res.status(200).json({
      success: true,
      results,
    });
  });
}

const createReserva = (req, res) => {
  const { usuario_id, paquete_id, fecha, cantidad } = req.body;

  if (!usuario_id || !paquete_id || !fecha || !cantidad) {
    return res.status(400).json({
      success: false,
      message: "Faltan datos",
    });
  }

  const sql =
    "INSERT INTO reservas (usuario_id, paquete_id, fecha, cantidad) VALUES (?, ?, ?, ?)";
  db.query(sql, [usuario_id, paquete_id, fecha, cantidad], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "No se creó la reserva",
      });
    }

    res.status(201).json({
      success: true,
      message: "Reserva creada con exito",
    });
  });
}

const getReservaById = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Id incorrecto",
    });
  }

  const sql = `
  SELECT
    r.id,
    r.fecha,
    r.cantidad,
    r.pagada,
    JSON_OBJECT(
      'id', u.id,
      'nombre', u.nombre,
      'apellido', u.apellido,
      'email', u.email
    ) AS usuario,
    JSON_OBJECT(
      'id', p.id,
      'nombre', p.nombre,
      'descripcion', p.descripcion,
      'costo', p.costo
    ) AS paquete
  FROM reservas r
  LEFT JOIN usuarios u ON r.usuario_id = u.id
  LEFT JOIN paquetes p ON r.paquete_id = p.id
  WHERE r.id = ?;`
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error en la solicitud",
      });
    }

    if (results.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message: "Reserva no encontrada",
      });
    }

    res.status(200).json({
      success: true,
      message: "Solicitud procesada con exito",
      results
    });
  });
}

const updateReserva = (req, res) => {
  const { id } = req.params
  const {usuario_id, paquete_id, fecha, cantidad} = req.body

  if(!id || isNaN(id)){
    return res.status(400).json({
      success: false,
      message: "Id incorrecto"
    })
  }

  if(!usuario_id || !paquete_id || !fecha || !cantidad){
    return res.status(400).json({
      success: false,
      message:"Faltan datos"
    })
  } 

  const sql = 'UPDATE reservas SET usuario_id = ?, paquete_id = ?, fecha = ?, cantidad = ? WHERE id = ?'
  db.query(sql, [usuario_id, paquete_id, fecha, cantidad, id], (err, results) => {
    if(err){
      return res.status(500).json({
        success: false,
        message:"error al actualizar la reserva",
        error: err.message
      })
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Reserva no encontrada"
      });
    }

    res.status(200).json({
      success: true,
      message:"Reserva actualizada",
      data: {
        id,
        usuario_id,
        paquete_id,
        fecha,
        cantidad
      }
    })
  })
}

const deleteReserva = (req, res) => {
  const { id } = req.params

  if(!id || isNaN(id)){
    return res.status(400).json({
      succsess: false,
      message:"Error en el id"
    })
  }

  const sql = 'DELETE FROM reservas WHERE id = ?'
  db.query(sql,[id], (err, results) => {
    if(err){
      return res.status(500).json({
        success:false,
        message:"Error al eliminar la reserva",
        error: err.message
      })
    }

    res.status(200).json({
      success: true,
      message:"Reserva eliminada con exito"
    })
  })
}

const buyReserva = (req, res) => {
  const {id} = req.params 

  if(!id){
    return res.status(400).json({
      success: false,
      message:"Error en el id"
    })
  }
  
  const sql = 'UPDATE reservas SET pagada = 1 WHERE id = ?'
  db.query(sql, [id], (err, results) => {
    if(err){
      return res.status(500).json({
        success: false,
        message:"error en la db"
      })
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Reserva no encontrada"
      });
    }

    res.status(200).json({
      success: true,
      message:"Pago realizado con exito",
      results
    })
  })
}

module.exports = {
  getAllReservas,
  createReserva,
  getReservaById,
  updateReserva,
  deleteReserva,
  buyReserva
}
