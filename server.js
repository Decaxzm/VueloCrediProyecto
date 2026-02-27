const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/vuelos', async (req, res) => {
const result = await pool.query('SELECT * FROM vuelos');
res.json(result.rows);
});


app.post('/pedidos', async (req, res) => {
const { usuario, vuelo_id } = req.body;
await pool.query(
'INSERT INTO pedidos (usuario, vuelo_id) VALUES ($1, $2)',
[usuario, vuelo_id]
);
res.json({ message: 'Pedido registrado correctamente' });
});


app.listen(3000, () => {
console.log('Servidor corriendo en http://localhost:3000');
});