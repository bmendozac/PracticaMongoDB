const { response } = require('express');
const bcrypt = require('bcryptjs');
const Cliente  = require('../models/cliente.model');

const getClientes = async (req, res)=>{
    
    const clientes = await Cliente.find();

    res.json({
        ok:true,
        clientes,
    });
}

const crearCliente = async(req, res=response)=>{

    const {nombres,apellidos,nombredeempresa,dni,direccion,celular} = req.body;

    try {

        const existeDni = await Cliente.findOne({dni});
        if(existeDni){
            return res.status(400).json({
                ok:false,
                msg: 'El dni ya ha sido registrado'
            });
        }

        //creamos un objeto de la clase model Usuario
        const cliente = new Cliente(req.body);

        //indicamos a mongoose que registre al usuario en la bd
        await cliente.save();

        
        res.json({
            ok:true,
            cliente
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor, revisar logs'
        });
    }  
} 

const actualizarCliente = async (req, res= response)=>{
    const uid = req.params.id;
        
    try {
        const clienteDB = await Cliente.findById(uid);

        if (!clienteDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un cliente con ese id'
            });
        }

        //Codigo previo a la actualizacion 
        const {nombres,apellidos,nombredeempresa,dni,direccion,celular,...campos} = req.body;
        if(clienteDB.dni !== dni){
            const existeDni = await Cliente.findOne({dni});
            if (existeDni){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un cliente con este dni'
                });
            }
        }
        campos.dni = dni;
        campos.nombres = nombres;
        campos.apellidos = apellidos;
        campos.nombredeempresa = nombredeempresa;
        campos.direccion = direccion;
        campos.celular = celular;
            
        //actualizacion de datos
        const clienteActualizado = await Cliente.findByIdAndUpdate(uid, campos, {new:true});

        res.json({
            ok:true,
            usuario: clienteActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar cliente'
        });
    }
}
const eliminarCliente = async(req, res=response) =>{
    const uid = req.params.id;
    try {
        const clienteDB = await Cliente.findById(uid);
        if(!clienteDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un cliente con ese id'
            });
        }

        await Cliente.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Cliente eliminado de la bd'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar cliente'
        });
    }
}


module.exports = {
    getClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
}