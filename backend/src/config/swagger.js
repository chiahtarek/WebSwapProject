
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.3',

        info: {
            title: 'Backend API',
            version: '1.0.0',
            description: 'Documentação da API do sistema',
        },

        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local',
            },
        ],

        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Informe seu token JWT',
                },
            },
        },
    },

    apis: [
        path.join(__dirname, '../routes/*.js')
    ],
};

const swaggerSpec = swaggerJsdoc(options);

console.log('Swagger paths:', Object.keys(swaggerSpec.paths));

module.exports = swaggerSpec;
