/*
    Path: /api/ventas
*/

const { Router } = require('express');
const { check } =  require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getVentas, crearVentas, actualizarVentas, eliminarVentas} = require('../controllers/ventas.controller');

const router = Router();

router.get('/', getVentas);
router.post('/',
    [
        check('titulo','El titulo de la venta es obligatorio').not().isEmpty(),
        check('descripcion','La descripcion de la venta es obligatorio').not().isEmpty(),
        check('fechadeventa','La fecha de venta es obligatorio').isDate(),
        //check('subtotal','El subtotal de la venta es obligatorio').not().isEmpty(),
        check('estado','El estado de la venta es obligatorio').not().isEmpty(),
        //check('igv','El igv de la venta es obligatorio').isDecimal,
        check('total','El total de la venta es obligatorio').not().isEmpty(),
        check('cliente','El id del cliente debe ser válido').isMongoId(),
        validarCampos,
    ],  
    crearVentas);
router.put('/:id',
    [
        check('titulo','El titulo de la venta es obligatorio').not().isEmpty(),
        check('descripcion','La descripcion de la venta es obligatorio').not().isEmpty(),
        check('fechadeventa','La fecha de venta es obligatorio').isDate(),
        //check('subtotal','El subtotal de la venta es obligatorio').not().isEmpty(),
        check('estado','El estado de la venta es obligatorio').not().isEmpty(),
        //check('igv','El igv de la venta es obligatorio').isDecimal,
        check('total','El total de la venta es obligatorio').not().isEmpty(),
        check('cliente','El id del cliente debe ser válido').isMongoId(),
        validarCampos,
    ],  
    actualizarVentas);
router.delete('/:id', eliminarVentas);

module.exports = router;