//busqueda

const { response } = require("express")

const Cliente = require('../models/cliente.model');
const Venta = require('../models/venta.model');
const Producto = require('../models/producto.model');
const Categoria = require('../models/categoria.model');

const busqueda = async (req, res=response)=>{

    const busqueda = req.params.busqueda; 
    const miRegExp = new RegExp(busqueda,'i'); //i  insensible

    const [clientes, ventas, productos, categoria] = await Promise.all ([
        Cliente.find({nombre:miRegExp}), // la busqueda es por nombre
        Venta.find({titulo:miRegExp}),
        Producto.find({nombre:miRegExp}),
        Categoria.find({nombre:miRegExp})
    ]);

    res.json({
        ok: true,
        msg: 'busqueda total',
        clientes,
        ventas,
        productos,
        categoria
    });

}

module.exports = {
    busqueda
}