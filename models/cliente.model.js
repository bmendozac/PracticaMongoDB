const {Schema, model, SchemaTypes} = require('mongoose');

const ClienteSchema = Schema({
    nombres:{
        type: String,
        required: true
    },
    apellidos:{
        type: String,
        required: true
    },
    nombredeempresa:{
        type: String,
        required: true
    },
    dni:{
        type: String,
        required: true,
        unique: true
    },
    direccion:{
        type: String,
        required: true
    },
    celular:{
        type: String,
        required: true
    }
},{ collection: 'clientes'});

ClienteSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model ('Cliente',ClienteSchema);