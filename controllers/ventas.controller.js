const { response } = require('express');
const Venta = require('../models/venta.model');
//const Detalleventa = require('../models/detalleventa.model');

const getVentas = async(req, res = response) => {

    const ventas = await Venta.find()
                                    .populate('cliente','titulo');

    res.json({
        ok: true,
        ventas
    })
}

const crearVentas = async(req, res = response) => {

    const uid = req.uid;
    let igv = req.body.total - req.body.total/1.18
    req.body.igv = igv
    req.body.subtotal = req.body.total - igv
    const venta = new Venta({ 
        cliente: uid,
        ...req.body 
    });

    try {

        const ventaDB = await venta.save();
        
        res.json({
            ok: true,
            venta: ventaDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar venta, consulte con el administrador'
        })
    }

}
const actualizarVentas = async (req, res= response)=>{
    const uid = req.params.id;
        
    try {
        const ventaDB = await Venta.findById(uid);

        if (!ventaDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe una venta con ese id'
            });
        }

        //Codigo previo a la actualizacion 
        const {titulo,descripcion,fechadeventa,estado,total,cliente,...campos} = req.body;
        if(ventaDB.titulo !== titulo){
            const existeTitulo = await Venta.findOne({titulo});
            if (existeTitulo){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una Venta con este titulo'
                });
            }
        }
        campos.titulo = titulo;
        campos.descripcion = descripcion;
        campos.fechadeventa = fechadeventa;
        campos.estado = estado;
        campos.total = total;
        campos.cliente = cliente;
        let igv = req.body.total - req.body.total/1.18
        campos.igv = igv
        campos.subtotal = req.body.total - igv
        //actualizacion de datos
        const ventaActualizada = await Venta.findByIdAndUpdate(uid, campos, {new:true});
         
        res.json({
            ok:true,
            venta: ventaActualizada
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar venta'
        });
    }
}
const eliminarVentas = async(req, res = response) => {

    const id  = req.params.id;

    try {
        
        const venta = await Venta.findById( id );

        if ( !venta ) {
            return res.status(404).json({
                ok: true,
                msg: 'Venta no encontrado por id',
            });
        }

        await Venta.findByIdAndDelete( id );


        res.json({
            ok: true,
            msg: 'La venta se ha eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
        })
    }
}    
           

module.exports = {
    getVentas,
    crearVentas,
    actualizarVentas,
    eliminarVentas
}