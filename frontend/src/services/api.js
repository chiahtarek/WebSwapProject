const API_URL = 'http://localhost:3001';

async function request(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        },
        ...options
    });

    const contentType =
        response.headers.get('content-type') || '';

    const data = contentType.includes('application/json')
        ? await response.json()
        : await response.text();

    if (!response.ok) {
        const mensagem =
            data?.erro ||
            data?.error ||
            'Erro na requisição.';

        const error = new Error(mensagem);

        error.status = response.status;
        error.data = data;

        throw error;
    }

    return data;
}

const api = {
    get: (path) => request(path),

    post: (path, body) =>
        request(path, {
            method: 'POST',
            body: JSON.stringify(body)
        }),

    put: (path, body) =>
        request(path, {
            method: 'PUT',
            body: JSON.stringify(body)
        }),

    delete: (path) =>
        request(path, {
            method: 'DELETE'
        })
};

export default api;