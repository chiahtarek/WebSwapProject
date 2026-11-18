const express = require('express');
const usuarioRoutes = require('./usuarioRoutes');   
const authRoutes = require('./authRoutes.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Geral
 *   description: Endpoints gerais
 */

/**
 * @swagger
 * /mensagem:
 *   get:
 *     summary: Testar conexão com o servidor
 *     tags: [Geral]
 *     responses:
 *       200:
 *         description: Servidor funcionando
 */

router.get('/mensagem', (req, res) => {
    res.json({
        texto: 'Olá do Servidor!'
    });
});



router.use('/usuarios', usuarioRoutes);

router.use('/auth', authRoutes);

module.exports = router;