const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config/config.js')
const db = require('../db/db.js')

const registrarUsuario = (req, res) =>{
  const {nombre, apellido, email, contrasena} = req.body
  if(!nombre || !apellido || !email || !contrasena) {
    return res.status(404).json({
      mesagge: "Faltan ingresar algún dato"
    })
  }

  const contrasenaEncriptada = bcrypt.hashSync(contrasena, 8)

  const sql = 'INSERT INTO usuarios (nombre, apellido, email, contrasena) VALUES (?,?,?,?)'
  
  db.query(sql, [nombre, apellido, email, contrasenaEncriptada], (err, resultado) => {
    if(err) {
      return res.status(500).json({
        mesagge: "Error al crear el usuario"
      })      
    }

    const token = jwt.sign(
      { id: resultado.insertId, email },
      config.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      mesagge:"Usuario creado con exito",
      token
    })
  })
}

const iniciarSesion = (req, res) => {
  
  const {email, contrasena} = req.body

  if(!email || !contrasena){
     return res.status(404).json({
      mensaje: "Falta ingresar algún dato"
     })
  }

  const sql = 'SELECT * FROM usuarios WHERE email = ?'
  db.query(sql, [email], (err, resultado) => {
    if(err){
      return res.status(500).json({
        mensaje:"error en el servidor",
        err
      })
    }

    if(resultado.length === 0){
      return res.status(404).json({
        mensaje:"Usuario no encontrado"
      })
    }

    const usuario = resultado[0]
    const contrasenaValida = bcrypt.compareSync(contrasena, usuario.contrasena)

    if(!contrasenaValida){
      return res.status(404).json({
        mensaje:"Error en la contraseña"
      })
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      config.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.status(200).json({
      mensaje: "inicio de sesion exitoso",
      token
    })

  })
}

const getAllUsuarios = (req, res) => {
  
  const sql = `
    SELECT
      u.id,
      u.nombre,
      u.apellido,
      u.email,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', o.id,
          'paquete_id', o.paquete_id,
          'comentario', o.comentario,
          'calificacion', o.calificacion,
          'fecha', o.fecha
        )
      ) AS opiniones,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', r.id,
          'paquete_id', r.paquete_id,
          'fecha', r.fecha,
          'cantidad', r.cantidad,
          'pagada', r.pagada
        )
      ) AS reservas
    FROM usuarios u
    LEFT JOIN opiniones o ON u.id = o.usuario_id
    LEFT JOIN reservas r ON u.id = r.usuario_id
    GROUP BY u.id, u.nombre, u.apellido, u.email;`

  db.query(sql, (err, resultado) => {
    if(err) return res.status(500).json({mesagge: "error"})
      
    res.status(200).json(resultado)
    })
}
const getUsuarioById = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "ID incorrecto"
    });
  }

  const sql = `
    SELECT
      u.id,
      u.nombre,
      u.apellido,
      u.email,
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', o.id, 'paquete_id', o.paquete_id, 'comentario', o.comentario, 'calificacion', o.calificacion, 'fecha', o.fecha))
        FROM opiniones o
        WHERE o.usuario_id = u.id
      ) AS opiniones,
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', r.id, 'paquete_id', r.paquete_id, 'fecha', r.fecha, 'cantidad', r.cantidad, 'pagada', r.pagada))
        FROM reservas r
        WHERE r.usuario_id = u.id
      ) AS reservas
    FROM usuarios u
    WHERE u.id = ?;
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error en la solicitud"
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }

    res.status(200).json({
      success: true,
      message: "Solicitud procesada con éxito",
      data: results[0]
    });
  });
};



module.exports = {
  registrarUsuario, 
  getAllUsuarios,
  iniciarSesion,
  getUsuarioById
}