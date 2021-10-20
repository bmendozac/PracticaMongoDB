const {Schema, model, SchemaTypes} = require('mongoose');

const VentaSchema = Schema({
    titulo:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    fechadeventa:{
        type: Schema.Types.Date,
        required: true
    },
    subtotal:{
        type: Schema.Types.Decimal128,
        required: false
    },
    estado:{
        type: String,
        required: true
    },
    igv:{
        type: Schema.Types.Decimal128,
        required: false
    },
    total:{
        type: String,
        required: true
    },
    cliente:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Cliente'
    }
},{ collection: 'ventas'});

VentaSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model ('Venta',VentaSchema);