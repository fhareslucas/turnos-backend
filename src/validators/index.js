// Auth validators
export { registerSchema, loginSchema } from "./auth.validator.js";

// Turno validators
export {
  createTurnoSchema,
  updateTurnoSchema,
  llamarTurnoSchema,
} from "./turno.validator.js";

// Mesa validators
export { createMesaSchema, updateMesaSchema } from "./mesa.validator.js";

// Servicio validators
export {
  createServicioSchema,
  updateServicioSchema,
} from "./servicio.validator.js";
