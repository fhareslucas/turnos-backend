'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tipo_servicio', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      codigo: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      color: {
        type: Sequelize.STRING(20),
        defaultValue: '#54243C',
        allowNull: false
      },
      activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      tiempo_estimado: {
        type: Sequelize.INTEGER,
        defaultValue: 15,
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
    await queryInterface.addIndex('tipo_servicio', ['codigo']);
    await queryInterface.addIndex('tipo_servicio', ['activo']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tipo_servicio');
  }
};