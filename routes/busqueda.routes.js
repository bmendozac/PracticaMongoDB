/*
    path: api/todo/busqueda
*/


const { Router } = require('express');
const { busqueda } = require('../controllers/busqueda.controller');

const router = Router();

router.get( '/:busqueda',busqueda );

module.exports = router;