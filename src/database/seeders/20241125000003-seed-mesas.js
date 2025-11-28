'use strict';

import { randomUUID } from 'crypto';

export async function up(queryInterface, Sequelize) {
  const mesas = [
    {
      id: randomUUID(),
      numero: 1,
      nombre: 'Mesa 1 - Atención General',
      estado: 'disponible',
      activo: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: randomUUID(),
      numero: 2,
      nombre: 'Mesa 2 - Atención General',
      estado: 'disponible',
      activo: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: randomUUID(),
      numero: 3,
      nombre: 'Mesa 3 - Inscripciones',
      estado: 'disponible',
      activo: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: randomUUID(),
      numero: 4,
      nombre: 'Mesa 4 - Pagos',
      estado: 'disponible',
      activo: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: randomUUID(),
      numero: 5,
      nombre: 'Mesa 5 - Trámites',
      estado: 'disponible',
      activo: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await queryInterface.bulkInsert('mesa', mesas);
  console.log(`✅ ${mesas.length} mesas creadas`);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('mesa', null, {});
}
