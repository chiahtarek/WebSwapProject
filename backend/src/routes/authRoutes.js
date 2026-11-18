const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Autenticacao
 *   description: Registro, login e verificação de email
 */

/**
 * @swagger
 * /auth/registrar:
 *   post:
 *     summary: Registrar novo usuário
 *     tags: [Autenticacao]
 *     responses:
 *       201:
 *         description: Usuário registrado
 *       400:
 *         description: Dados inválidos
 */

router.post('/registrar', authController.registrar);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realizar login
 *     tags: [Autenticacao]
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */

router.post('/login', authController.login);

/**
 * @swagger
 * /auth/verificar-email:
 *   get:
 *     summary: Verificar email do usuário
 *     tags: [Autenticacao]
 *     responses:
 *       200:
 *         description: Verificação realizada
 *       400:
 *         description: Código ou dados inválidos
 */

router.get('/verificar-email', authController.verificarEmail);

/**
 * @swagger
 * /auth/reenviar-email:
 *   post:
 *     summary: Reenviar email de verificação
 *     tags: [Autenticacao]
 *     responses:
 *       200:
 *         description: Email reenviado
 *       400:
 *         description: Não foi possível reenviar
 */

router.post('/reenviar-email', authController.reenviarEmailVerificacao);

module.exports = router;