const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

const obterTodosUsuario = async () => {
    return await Usuario.findAll();
};

const obterUsuarioPorId = async (id) => {
    return await Usuario.findByPk(id);
};

const criarUsuario = async (data) => {
    //return await Usuario.create(data);
    const senhaHash = await bcrypt.hash(data.senha, 10);
    return await Usuario.create({ ...data, senha: senhaHash });
};

const atualizarUsuario = async (id, data) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return null;
    }

    await usuario.update(data);
    return usuario;
};

const deletarUsuario = async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return null;
    }

    await usuario.destroy();
    return usuario;
};

module.exports = { obterTodosUsuario,
    obterUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
 };