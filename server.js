import app from './src/app.js'; 
import {testConnection} from './src/config/database.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Solo test de conexión, NO sync
    const isConnected = await testConnection();
    if (!isConnected) {
      throw new Error('No se pudo conectar a la base de datos');
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀  Sistema de Turnos - Backend V2                     ║
║                                                           ║
║   ✓  Servidor corriendo en puerto ${PORT}                   ║
║   ✓  Base de datos conectada                             ║
║   ✓  Entorno: ${process.env.NODE_ENV || 'development'}                          ║
║                                                           ║
║   📡  URL: http://localhost:${PORT}                       ║
║   🏥  Health: http://localhost:${PORT}/api/health         ║
║   📚  API: http://localhost:${PORT}/api                   ║
║                                                           ║
║   🗄️  Usando Migraciones de Sequelize                    ║
║   📝  Comandos:                                           ║
║      npm run db:migrate      - Ejecutar migraciones      ║
║      npm run db:seed         - Ejecutar seeders          ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
      `);
    });

  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

// Error handlers
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Rejection:', error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Start
startServer();