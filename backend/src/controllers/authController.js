const authService = require('../services/authService');

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const resultado = await authService.login(email, senha);
        res.status(200).json(resultado);

    } catch (err) {

        if (err.message === 'CREDENCIAIS_INVALIDAS') {
            return res.status(401).json({
                err: 'Email ou senha inválidos'
            });
        }

        console.error('========== ERRO NO LOGIN ==========');
        console.error(err);
        console.error(err.stack);
        console.error('===================================');

        res.status(500).json({
            err: 'Erro interno ao fazer login'
        });
    }
};

const registrar = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const resultado = await authService.registrar(
            nome,
            email,
            senha
        );

        return res.status(201).json(resultado);

    } catch (err) {
        if (err.message === 'EMAIL_EXISTENTE') {
            return res.status(409).json({
                err: 'Este email já está cadastrado'
            });
        }

        console.error(err);

        return res.status(500).json({
            err: 'Erro ao criar conta', 
            detalhe: err.message
        });
    }
};

const verificarEmail = async (req, res) => {
    const { token } = req.query;

    try {
        const resultado = await authService.verificarEmail(token);

        return res.status(200).json(resultado);

    } catch (err) {
        if (err.message === 'TOKEN_INVALIDO') {
            return res.status(400).json({
                err: 'Token inválido'
            });
        }

        if (err.message === 'TOKEN_EXPIRADO') {
            return res.status(400).json({
                err: 'Token expirado. Solicite um novo email.'
            });
        }

        console.error(err);

        return res.status(500).json({
            err: 'Erro ao verificar email'
        });
    }
};

const reenviarEmailVerificacao = async (req, res) => {
    const { email } = req.body;

    try {
        const resultado = await authService.reenviarEmailVerificacao(email);

        return res.status(200).json(resultado);

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            err: 'Erro ao reenviar email'
        });
    }
};

module.exports = {  
    login,
    registrar,
    verificarEmail,
    reenviarEmailVerificacao 
};