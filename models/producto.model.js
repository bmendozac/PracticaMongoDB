const {Schema, model, SchemaTypes} = require('mongoose');

const ProductoSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    preciounitario:{
        type: Schema.Types.Decimal128,
        required: true
    },
    stock:{
        type: Schema.Types.Number,
        required: true
    },
    categoria:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    }
},{ collection: 'productos'});

ProductoSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model ('Producto', ProductoSchema);