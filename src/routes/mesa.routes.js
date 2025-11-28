import express from 'express';
const router = express.Router();
import controllers from '../controllers/index.js';
const { mesaController } = controllers;
import { authenticate, isAdmin, validate } from '../middleware/index.js';
import { createMesaSchema, updateMesaSchema } from '../validators/index.js';

router.use(authenticate);

router.get('/', mesaController.getAll);
router.get('/:id', mesaController.getById);
router.post('/', isAdmin, validate(createMesaSchema), mesaController.create);
router.put('/:id', isAdmin, validate(updateMesaSchema), mesaController.update);
router.delete('/:id', isAdmin, mesaController.delete);

export default router;
