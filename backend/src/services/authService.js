const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { randomBytes, createHash } = require('node:crypto');
const Usuario = require('../models/Usuario');
const emailService = require('./emailService');
require('dotenv').config();

console.log(process.env.MYSQL_DATABASE);

const login = async (email, senha) => {
    const usuario = await Usuario.scope('comSenha').findOne({ where: { email } });
    if (!usuario || !usuario.senha) {
        console.log("teste");
        throw new Error('CREDENCIAIS_INVALIDAS');
    }
    const confere = await bcrypt.compare(senha, usuario.senha);
    if (!confere) {
        console.log("testess");
        throw new Error('CREDENCIAIS_INVALIDAS');
    }
    const token = jwt.sign(
        { id: usuario.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    return { token, usuario: { id: usuario.id, nome: usuario.nome } };
};



const registrar = async (nome, email, senha) => {
    const existente = await Usuario.findOne({
        where: { email }
    });

    if (existente) {
        throw new Error('EMAIL_EXISTENTE');
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    // Generate a secure token
    const token = randomBytes(32).toString('hex');

    // Store only the token hash in the database
    const tokenHash = createHash('sha256')
    .update(token)
    .digest('hex');

    const usuario = await Usuario.create({
        nome,
        email,
        senha: senhaHash,
        emailVerificado: false,
        tokenVerificacao: tokenHash,
        tokenVerificacaoExpira: new Date(Date.now() + 30 * 60 * 1000)
    });

    await emailService.enviarEmailVerificacao(email, token);

    return {
        mensagem: 'Conta criada! Verifique seu email para ativar sua conta.',
        id: usuario.id
    };
};

const verificarEmail = async (token) => {
    const tokenHash = createHash('sha256')
        .update(token)
        .digest('hex');

    const usuario = await Usuario.findOne({
        where: {
            tokenVerificacao: tokenHash
        }
    });

    if (!usuario) {
        throw new Error('TOKEN_INVALIDO');
    }

    if (usuario.tokenVerificacaoExpira < new Date()) {
        throw new Error('TOKEN_EXPIRADO');
    }

    usuario.emailVerificado = true;
    usuario.tokenVerificacao = null;
    usuario.tokenVerificacaoExpira = null;

    await usuario.save();

    return {
        mensagem: 'Email verificado com sucesso!'
    };
};

const reenviarEmailVerificacao = async (email) => {
    const usuario = await Usuario.findOne({
        where: { email }
    });

    // Use a generic response to avoid revealing registered emails
    if (!usuario || usuario.emailVerificado) {
        return {
            mensagem: 'Se a conta existir e precisar de confirmação, enviaremos um email.'
        };
    }

    const token = randomBytes(32).toString('hex');

    const tokenHash = createHash('sha256')
        .update(token)
        .digest('hex');

    usuario.tokenVerificacao = tokenHash;
    usuario.tokenVerificacaoExpira = new Date(
        Date.now() + 30 * 60 * 1000
    );

    await usuario.save();

    await emailService.enviarEmailVerificacao(usuario.email, token);

    return {
        mensagem: 'Se a conta existir e precisar de confirmação, enviaremos um email.'
    };
};

module.exports = {
    login,
    registrar,
    verificarEmail,
    reenviarEmailVerificacao
};