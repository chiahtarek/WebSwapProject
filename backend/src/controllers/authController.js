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

module.exports = { login };