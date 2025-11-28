import express from "express";

const router = express.Router();
import controllers from "../controllers/index.js";
const { turnoController } = controllers;
import { authenticate, validate } from "../middleware/index.js";
import {
  createTurnoSchema,
  updateTurnoSchema,
  llamarTurnoSchema,
} from "../validators/turno.validator.js";

router.use(authenticate);

router.post("/", validate(createTurnoSchema), turnoController.create);
router.get("/", turnoController.getAll);
router.get("/estadisticas", turnoController.getEstadisticas);
router.get("/:id", turnoController.getById);
router.put("/:id/llamar", validate(llamarTurnoSchema), turnoController.llamar);
router.put(
  "/:id/completar",
  validate(updateTurnoSchema),
  turnoController.completar
);
router.put(
  "/:id/cancelar",
  validate(updateTurnoSchema),
  turnoController.cancelar
);

export default router;
