import api from './api';

export const getUsuarios = async () => {
    return await api.get('/usuarios');
};

export const getUsuario = async (id) => {
    return await api.get(`/usuarios/${id}`);
};

export const createUsuario = async (usuario) => {
    return await api.post('/usuarios', usuario);
};

export const updateUsuario = async (id, usuario) => {
    return await api.put(`/usuarios/${id}`, usuario);
};

export const deleteUsuario = async (id) => {
    return await api.delete(`/usuarios/${id}`);
};