/*
    Path: /api/clientes
*/

const { Router } = require('express');
const { check } =  require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getClientes, crearCliente, actualizarCliente, eliminarCliente} = require('../controllers/clientes.controller');

const router = Router();

router.get('/', getClientes);
router.post('/',
    [
        check('nombres','Los nombres es obligatorio').not().isEmpty(),
        check('apellidos', 'Los apellidos es obligatorio').not().isEmpty(),
        check('nombredeempresa', 'El nombre de empresa es obligatorio').not().isEmpty(),
        check('dni', 'El dni es obligatorio').not().isEmpty(),
        check('direccion', 'La direccion es obligatorio').not().isEmpty(),
        check('celular', 'El número de celular es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearCliente);
router.put('/:id',
    [
        check('nombres','Los nombres es obligatorio').not().isEmpty(),
        check('apellidos', 'Los apellidos es obligatorio').not().isEmpty(),
        check('nombredeempresa', 'El nombre de empresa es obligatorio').not().isEmpty(),
        check('dni', 'El dni es obligatorio').not().isEmpty(),
        check('direccion', 'La direccion es obligatorio').not().isEmpty(),
        check('celular', 'El número de celular es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarCliente);
router.delete('/:id', eliminarCliente);

module.exports = router;