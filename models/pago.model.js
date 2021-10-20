const {Schema, model, SchemaTypes} = require('mongoose');

const PagoSchema = Schema({
    tipodepago:{
        type: String,
        required: true
    },
    fechadepago:{
        type: Schema.Types.Date,
        required: true
    },
    cantidadpagada:{
        type: Schema.Types.Decimal128,
        required: true
    },
    venta:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Venta'
    }
},{ collection: 'pagos'});

PagoSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model ('Pago', PagoSchema );