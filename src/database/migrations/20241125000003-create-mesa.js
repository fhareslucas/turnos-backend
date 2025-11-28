'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mesa', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      nombre: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      estado: {
        type: Sequelize.ENUM('disponible', 'ocupada', 'inactiva'),
        defaultValue: 'disponible',
        allowNull: false
      },
      activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Índices
    await queryInterface.addIndex('mesa', ['numero']);
    await queryInterface.addIndex('mesa', ['estado']);
    await queryInterface.addIndex('mesa', ['activo']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('mesa');
  }
};