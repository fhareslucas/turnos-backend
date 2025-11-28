import Joi from "joi";

/**
 * Schema de validación para crear un turno
 */
export const createTurnoSchema = Joi.object({
  tipo_servicio_id: Joi.string().uuid().required().messages({
    "string.base": "El tipo de servicio debe ser un ID válido",
    "string.empty": "El tipo de servicio es requerido",
    "string.guid": "El tipo de servicio debe ser un UUID válido",
    "any.required": "El tipo de servicio es requerido",
  }),

  nombre_cliente: Joi.string().min(3).max(100).optional().allow("").messages({
    "string.base": "El nombre del cliente debe ser texto",
    "string.min": "El nombre del cliente debe tener al menos 3 caracteres",
    "string.max": "El nombre del cliente no puede exceder 100 caracteres",
  }),

  prioridad: Joi.number().integer().min(0).max(10).default(0).messages({
    "number.base": "La prioridad debe ser un número",
    "number.integer": "La prioridad debe ser un número entero",
    "number.min": "La prioridad debe ser al menos 0",
    "number.max": "La prioridad no puede ser mayor a 10",
  }),

  observaciones: Joi.string().max(500).optional().allow("").messages({
    "string.base": "Las observaciones deben ser texto",
    "string.max": "Las observaciones no pueden exceder 500 caracteres",
  }),
});

/**
 * Schema de validación para llamar un turno
 */
export const llamarTurnoSchema = Joi.object({
  mesa_id: Joi.string().uuid().required().messages({
    "string.base": "El ID de la mesa debe ser un ID válido",
    "string.empty": "El ID de la mesa es requerido",
    "string.guid": "El ID de la mesa debe ser un UUID válido",
    "any.required": "El ID de la mesa es requerido",
  }),
});

/**
 * Schema de validación para actualizar un turno (completar/cancelar)
 */
export const updateTurnoSchema = Joi.object({
  observaciones: Joi.string().max(500).optional().allow("").messages({
    "string.base": "Las observaciones deben ser texto",
    "string.max": "Las observaciones no pueden exceder 500 caracteres",
  }),
});
