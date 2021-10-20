const {Schema, model, SchemaTypes} = require('mongoose');

const CategoriaSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    }
},{ collection: 'categorias'});

CategoriaSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model ('Categoria', CategoriaSchema);