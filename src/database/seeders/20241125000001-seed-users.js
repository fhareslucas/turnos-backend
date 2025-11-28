'use strict';
import bcrypt from 'bcrypt';
import { randomUUID as uuidv4 } from 'crypto';

export default {
  up: async (queryInterface, Sequelize) => {
    const adminId = uuidv4();
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await queryInterface.bulkInsert('user', [
      {
        id: adminId,
        nombre: 'Administrador',
        email: 'admin@sistema.com',
        password: hashedPassword,
        rol: 'admin',
        activo: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

    console.log('✅ Usuario administrador creado');
    console.log('   📧 Email: admin@sistema.com');
    console.log('   🔑 Password: admin123');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', { email: 'admin@sistema.com' }, {});
  }
};