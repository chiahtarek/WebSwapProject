const express = require('express');
const usuarioRoutes = require('./usuarioRoutes');

const router = express.Router();

router.get('/mensagem', (req, res) => {
    res.json({
        texto: 'Olá do Servidor!'
    });
});

router.use('/usuarios', usuarioRoutes);

module.exports = router;