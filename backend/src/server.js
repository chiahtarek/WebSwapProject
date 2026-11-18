
const express = require('express');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const router = require('./routes/routes');

const app = express();
const PORT = 3000;
require('dotenv').config();
// Middlewares
app.use(cors());
app.use(express.json());

// Swagger JSON
app.get('/api-docs/swagger.json', (req, res) => {
    res.json(swaggerSpec);
});

// Swagger UI
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// API routes
app.use('/', router);

// Start server
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
});
