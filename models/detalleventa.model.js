const {Schema, model, SchemaTypes} = require('mongoose');

const DetalleventaSchema = Schema({
    cantidad:{
        type: Schema.Types.Int,
        required: false
    },
    subtotal:{
        type: Schema.Types.Decimal128,
        required: false
    },
    producto:{
        required: false,
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    },
    venta:{
        required: false,
        type: Schema.Types.ObjectId,
        ref: 'Venta'
    }
},{ collection:'detalleventas'});

DetalleventaSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model ('Detalleventa',DetalleventaSchema);