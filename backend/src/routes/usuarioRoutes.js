const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const { autenticar } = require('../middlewares/authMiddleware');

const router = express.Router();



router.get('/', autenticar, usuarioController.buscarUsuarios);
router.get('/:id', autenticar, usuarioController.buscarUsuarioPorId);

router.put('/:id', autenticar, usuarioController.atualizarUsuario);
router.delete('/:id', autenticar, usuarioController.deletarUsuario);

module.exports = router;

