'use strict';
import { randomUUID as uuidv4 } from 'crypto';

export default {
  up: async (queryInterface, Sequelize) => {
    const servicios = [
      {
        id: uuidv4(),
        nombre: 'Inscripción',
        codigo: 'INS',
        descripcion: 'Servicio de inscripción de nuevos estudiantes',
        color: '#54243C',
        tiempo_estimado: 20,
        activo: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        nombre: 'Información',
        codigo: 'INF',
        descripcion: 'Solicitud de información general',
        color: '#1E40AF',
        tiempo_estimado: 10,
        activo: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        nombre: 'Consulta',
        codigo: 'CON',
        descripcion: 'Consultas académicas y administrativas',
        color: '#059669',
        tiempo_estimado: 15,
        activo: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        nombre: 'Trámite',
        codigo: 'TRA',
        descripcion: 'Gestión de trámites documentales',
        color: '#DC2626',
        tiempo_estimado: 25,
        activo: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        nombre: 'Pago',
        codigo: 'PAG',
        descripcion: 'Procesamiento de pagos y facturación',
        color: '#7C3AED',
        tiempo_estimado: 10,
        activo: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await queryInterface.bulkInsert('tipo_servicio', servicios);
    console.log(`✅ ${servicios.length} tipos de servicio creados`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tipo_servicio', null, {});
  }
};