// app.js
const express = require('express');
const bodyParser = require('body-parser');
const compraRoutes = require('./routes/compraRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/api', compraRoutes);

app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Compras');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
