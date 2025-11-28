'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('turno', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      codigo: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      tipo_servicio_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tipo_servicio',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      mesa_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'mesa',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      estado: {
        type: Sequelize.ENUM('en_espera', 'en_atencion', 'completado', 'cancelado'),
        defaultValue: 'en_espera',
        allowNull: false
      },
      prioridad: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      nombre_cliente: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      observaciones: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      atendido_por: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'user',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      hora_llamado: {
        type: Sequelize.DATE,
        allowNull: true
      },
      hora_atencion: {
        type: Sequelize.DATE,
        allowNull: true
      },
      hora_finalizacion: {
        type: Sequelize.DATE,
        allowNull: true
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

    // Índices para optimizar consultas
    await queryInterface.addIndex('turno', ['codigo']);
    await queryInterface.addIndex('turno', ['tipo_servicio_id']);
    await queryInterface.addIndex('turno', ['mesa_id']);
    await queryInterface.addIndex('turno', ['estado']);
    await queryInterface.addIndex('turno', ['created_at']);
    await queryInterface.addIndex('turno', ['prioridad', 'created_at']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('turno');
  }
};