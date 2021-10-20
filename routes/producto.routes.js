/*
    Path: /api/productos
*/
const { Router } = require('express');
const { check } =  require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getProductos, crearProductos, actualizarProductos, eliminarProductos} = require('../controllers/productos.controller');

const router = Router();

router.get('/', getProductos);
router.post('/',
    [
        check('nombre','El nombre del producto es obligatorio').not().isEmpty(),
        check('preciounitario','El precio unitario del producto es obligatorio').isDecimal(),
        check('stock','El stock del producto es obligatorio').isInt(),
        check('categoria','El id de la categoria debe ser válido').isMongoId(),
        validarCampos,
    ],  
    crearProductos);
router.put('/:id',
    [
        check('nombre','El nombre del producto es obligatorio').not().isEmpty(),
        check('preciounitario','El precio unitario del producto es obligatorio').isDecimal(),
        check('stock','El stock del producto es obligatorio').isInt(),
        check('categoria','El id de la categoria debe ser válido').isMongoId(),
        validarCampos,
    ],  
    actualizarProductos);
router.delete('/:id', eliminarProductos);

module.exports = router;