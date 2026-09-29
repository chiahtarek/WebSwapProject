const bcrypt = require('bcrypt');

const usuarioService = require('../services/usuarioService');

const removerSenha = (usuario) => {
    if (!usuario) {
        return usuario;
    }

    const dados = usuario.toJSON();

    delete dados.senha;

    return dados;
};

// GET /usuarios
const buscarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.obterTodosUsuario();

        res.status(200).json(
            usuarios.map(removerSenha)
        );
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);

        res.status(500).json({
            erro: 'Erro ao buscar usuários.'
        });
    }
};

// GET /usuarios/:id
const buscarUsuarioPorId = async (req, res) => {
    try {
        const usuario = await usuarioService.obterUsuarioPorId(
            req.params.id
        );

        if (!usuario) {
            return res.status(404).json({
                erro: 'Usuário não encontrado.'
            });
        }

        res.status(200).json(removerSenha(usuario));
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);

        res.status(500).json({
            erro: 'Erro interno ao buscar usuário.'
        });
    }
};

// POST /usuarios
const criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha, foto} = req.body;

        if (!nome?.trim() || !email?.trim() || !senha) {
            return res.status(400).json({
                erro: 'Nome, e-mail e senha são obrigatórios.'
            });
        }

        const usuarios = await usuarioService.obterTodosUsuario();

        const emailExiste = usuarios.some(
            (usuario) =>
                usuario.email.toLowerCase() ===
                email.trim().toLowerCase()
        );

        if (emailExiste) {
            return res.status(409).json({
                erro: 'Já existe um usuário com este e-mail.'
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = await usuarioService.criarUsuario({
            nome: nome.trim(),
            email: email.trim().toLowerCase(),
            senha: senhaHash,
            foto: foto || null
        });

        res.status(201).json(removerSenha(usuario));
    } catch (error) {
        console.error('Erro ao criar usuário:', error);

        res.status(500).json({
            erro: 'Erro ao criar usuário.'
        });
    }
};

// PUT /usuarios/:id
const atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha, foto } = req.body;

        const usuarioExistente =
            await usuarioService.obterUsuarioPorId(id);

        if (!usuarioExistente) {
            return res.status(404).json({
                erro: 'Usuário não encontrado.'
            });
        }

        if (!nome?.trim() || !email?.trim()) {
            return res.status(400).json({
                erro: 'Nome e e-mail são obrigatórios.'
            });
        }

        const usuarios = await usuarioService.obterTodosUsuario();

        const emailExiste = usuarios.some(
            (usuario) =>
                usuario.id !== Number(id) &&
                usuario.email.toLowerCase() ===
                email.trim().toLowerCase()
        );

        if (emailExiste) {
            return res.status(409).json({
                erro: 'Já existe um usuário com este e-mail.'
            });
        }

        const dados = {
            nome: nome.trim(),
            email: email.trim().toLowerCase()
        };

        if (foto !== undefined) {
            dados.foto = foto;
        }

        if (senha) {
            dados.senha = await bcrypt.hash(senha, 10);
        }

        const usuario =
            await usuarioService.atualizarUsuario(id, dados);

        res.status(200).json(removerSenha(usuario));
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);

        res.status(500).json({
            erro: 'Erro interno ao atualizar usuário.'
        });
    }
};

// DELETE /usuarios/:id
const deletarUsuario = async (req, res) => {
    try {
        const usuario =
            await usuarioService.deletarUsuario(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                erro: 'Usuário não encontrado.'
            });
        }

        res.status(200).json({
            mensagem: 'Usuário deletado com sucesso.'
        });
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);

        res.status(500).json({
            erro: 'Erro interno ao deletar usuário.'
        });
    }
};

module.exports = {
    buscarUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};