'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('usuarios', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            senha: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            foto: {
                type: Sequelize.TEXT('long'),
                allowNull: true,
            },

            // Email verification
            emailVerificado: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            tokenVerificacao: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            tokenVerificacaoExpira: {
                type: Sequelize.DATE,
                allowNull: true,
            },

            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal(
                    'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
                ),
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('usuarios');
    }
};