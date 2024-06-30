const mysql = require('mysql2');

const conection = mysql.createConnection({
  host: 'monorail.proxy.rlwy.net',
  port: 25814,
  user: 'root',
  password: 'qxRlWCaNXDJcyQAqmElEokUNTDLkvjDF',
  database: 'railway'
});

conection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL en Railway');
});

module.exports = conection