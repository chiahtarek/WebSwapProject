const express = require('express');
const usuarioRoutes = require('./usuarioRoutes');   
const authRoutes = require('./authRoutes.js');

const router = express.Router();

router.get('/mensagem', (req, res) => {
    res.json({
        texto: 'Olá do Servidor!'
    });
});

router.use('/usuarios', usuarioRoutes);

router.use('/login', authRoutes);

module.exports = router;