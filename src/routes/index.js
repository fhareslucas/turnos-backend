import express from 'express';
const router = express.Router();
import authRoutes from './auth.routes.js';
import turnoRoutes from './turno.routes.js';
import mesaRoutes from './mesa.routes.js';
import servicioRoutes from './servicio.routes.js';

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
router.use('/auth', authRoutes);
router.use('/turnos', turnoRoutes);
router.use('/mesas', mesaRoutes);
router.use('/servicios', servicioRoutes);

// 404 Handler
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

export default router;