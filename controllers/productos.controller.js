const { response } = require('express');
const Producto = require('../models/producto.model');

const getProductos = async(req, res = response) => {

    const productos = await Producto.find()
                                    .populate('categoria','nombre');

    res.json({
        ok: true,
        productos
    })
}

const crearProductos = async(req, res = response) => {

    const uid = req.uid;
    const producto = new Producto({ 
        categoria: uid,
        ...req.body 
    });

    try {

        const productoDB = await producto.save();
        
        res.json({
            ok: true,
            venta: productoDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar producto, consulte con el administrador'
        })
    }

}
const actualizarProductos = async (req, res= response)=>{
    const uid = req.params.id;
        
    try {
        const productoDB = await Producto.findById(uid);

        if (!productoDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un producto con ese id'
            });
        }

        //Codigo previo a la actualizacion 
        const {nombre,preciounitario,stock,categoria,...campos} = req.body;
        if(productoDB.nombre !== nombre){
            const existeNombre = await Producto.findOne({nombre});
            if (existeNombre){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un Producto con este nombre'
                });
            }
        }
        campos.nombre = nombre;
        campos.preciounitario = preciounitario;
        campos.stock = stock;
        campos.categoria = categoria;
               
        //actualizacion de datos
        const productoActualizado = await Producto.findByIdAndUpdate(uid, campos, {new:true});

        res.json({
            ok:true,
            producto: productoActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar producto'
        });
    }
}
const eliminarProductos = async(req, res = response) => {

    const id  = req.params.id;

    try {
        
        const producto = await Producto.findById( id );

        if ( !producto ) {
            return res.status(404).json({
                ok: true,
                msg: 'Producto no encontrado por id',
            });
        }

        await Producto.findByIdAndDelete( id );


        res.json({
            ok: true,
            msg: 'El producto se ha eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
        })
    }
}    

module.exports = {
    getProductos,
    crearProductos,
    actualizarProductos,
    eliminarProductos
}