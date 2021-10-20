const express = require('express'); //de esta forma se importa en node

require('dotenv').config();
const { dbConection } = require('./config/database');
const cors  = require('cors');

//Creando el servidor express
const app = express();

//Configuracion de CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Conexion a la BD
dbConection();

//Rutas de la API
app.use('/api/clientes', require('./routes/clientes.routes'));
app.use('/api/ventas',require('./routes/ventas.routes'));
app.use('/api/categorias',require('./routes/categoria.routes'));
app.use('/api/productos',require('./routes/producto.routes'));
app.use('/api/busqueda',require('./routes/busqueda.routes'));

//Para levantar el servidor
app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto ' + process.env.PORT)
})