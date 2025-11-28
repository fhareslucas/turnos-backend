import express from 'express';
const router = express.Router();
import controllers from '../controllers/index.js';
const { servicioController } = controllers;
import { authenticate, isAdmin, validate } from '../middleware/index.js';
import { createServicioSchema, updateServicioSchema } from '../validators/index.js';

router.use(authenticate);

router.get('/', servicioController.getAll);
router.get('/:id', servicioController.getById);
router.post('/', isAdmin, validate(createServicioSchema), servicioController.create);
router.put('/:id', isAdmin, validate(updateServicioSchema), servicioController.update);
router.delete('/:id', isAdmin, servicioController.delete);

export default router;
