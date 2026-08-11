const express = require('express'); // para rotas e requisições HTTP
const cors = require('cors'); // segurança dos dados
const app = express();

app.use(cors());
app.use(express.json()); 

// rota raiz
app.get('/api/mensagem', (req, res) => {
    res.json({texto: "Olá do Servidor!"});
});

app.listen(3001);