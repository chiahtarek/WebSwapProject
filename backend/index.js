const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Rota simples
app.get('/api/mensagem', (req, res) => {
    res.json({
        texto: 'Olá do Servidor!'
    });
});


app.get('/cep/:cep', async (req, res) => {
    const { cep } = req.params;

    try {
        const resposta = await fetch(
            `https://viacep.com.br/ws/${encodeURIComponent(cep)}/json/`
        );

        console.log('Status do ViaCEP:', resposta.status);

        if (!resposta.ok) {
            return res.status(resposta.status).json({
                erro: 'Erro retornado pelo ViaCEP'
            });
        }

        const dados = await resposta.json();

        res.status(200).json(dados);

    } catch (error) {
        console.error('ERRO:', error);

        res.status(500).json({
            erro: 'Erro de comunicação com o ViaCEP',
            detalhe: error.message
        });
    }
});


app.get('/endereco/:uf/:cidade/:logradouro/json', async (req, res) => {
    const { uf, cidade, logradouro } = req.params;

    try {
        const resposta = await fetch(
            `https://viacep.com.br/ws/${encodeURIComponent(uf)}/${encodeURIComponent(cidade)}/${encodeURIComponent(logradouro)}/json/`
        );

        console.log('Status do ViaCEP:', resposta.status);

        if (!resposta.ok) {
            return res.status(resposta.status).json({
                erro: 'Erro retornado pelo ViaCEP'
            });
        }

        const dados = await resposta.json();

        res.status(200).json(dados);

    } catch (error) {
        console.error('ERRO:', error);

        res.status(500).json({
            erro: 'Erro de comunicação com o ViaCEP',
            detalhe: error.message
        });
    }
});



app.get('/endereco/:uf/:cidade/:logradouro/xml', async (req, res) => {
    const { uf, cidade, logradouro } = req.params;

    try {
        const resposta = await fetch(
            `https://viacep.com.br/ws/${encodeURIComponent(uf)}/${encodeURIComponent(cidade)}/${encodeURIComponent(logradouro)}/xml/`
        );

        console.log('Status do ViaCEP:', resposta.status);

        if (!resposta.ok) {
            return res.status(resposta.status).send(`
                <?xml version="1.0" encoding="UTF-8"?>
                <erro>Erro retornado pelo ViaCEP</erro>
            `);
        }

        const dados = await resposta.text();

        res
            .status(200)
            .type('application/xml')
            .send(dados);

    } catch (error) {
        console.error('ERRO:', error);

        res
            .status(500)
            .type('application/xml')
            .send(`
                <?xml version="1.0" encoding="UTF-8"?>
                <erro>
                    <mensagem>Erro de comunicação com o ViaCEP</mensagem>
                    <detalhe>${error.message}</detalhe>
                </erro>
            `);
    }
});



app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
