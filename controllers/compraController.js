// controllers/compraController.js
const db = require('../config/db');

// Crear una nueva compra
exports.crearCompra = async (req, res) => {
    const { producto, cantidad, precio, metodoPago } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO compras (producto, cantidad, precio, metodoPago) VALUES (?, ?, ?, ?)',
            [producto, cantidad, precio, metodoPago]
        );
        res.status(201).json({ id: result.insertId, producto, cantidad, precio, metodoPago });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las compras
exports.obtenerCompras = async (req, res) => {
    try {
        const [compras] = await db.execute('SELECT * FROM compras');
        res.status(200).json(compras);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una compra por ID
exports.obtenerCompraPorId = async (req, res) => {
    try {
        const [compras] = await db.execute('SELECT * FROM compras WHERE id = ?', [req.params.id]);
        if (compras.length === 0) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.status(200).json(compras[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una compra
exports.actualizarCompra = async (req, res) => {
    const { producto, cantidad, precio, metodoPago } = req.body;
    try {
        const [result] = await db.execute(
            'UPDATE compras SET producto = ?, cantidad = ?, precio = ?, metodoPago = ? WHERE id = ?',
            [producto, cantidad, precio, metodoPago, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.status(200).json({ id: req.params.id, producto, cantidad, precio, metodoPago });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una compra
exports.eliminarCompra = async (req, res) => {
    try {
        const [result] = await db.execute('DELETE FROM compras WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.status(200).json({ message: 'Compra eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
