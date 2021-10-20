/*
    Path: /api/categorias
*/
const { Router } = require('express');
const { check } =  require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getCategorias, crearCategorias, actualizarCategorias, eliminarCategorias} = require('../controllers/categorias.controller');

const router = Router();

router.get('/', getCategorias);
router.post('/', 
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('descripcion','La descripcion es obligatoria').not().isEmpty(),
        validarCampos,
    ],
    crearCategorias);
router.put('/:id', 
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('descripcion','La descripcion es obligatoria').not().isEmpty(),
        validarCampos,
    ],
    actualizarCategorias);
router.delete('/:id', eliminarCategorias);

module.exports = router;