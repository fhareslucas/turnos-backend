import Joi from "joi";

/**
 * Schema de validación para crear una mesa
 */
export const createMesaSchema = Joi.object({
  numero: Joi.number().integer().min(1).required().messages({
    "number.base": "El número de mesa debe ser un número",
    "number.integer": "El número de mesa debe ser un número entero",
    "number.min": "El número de mesa debe ser al menos 1",
    "any.required": "El número de mesa es requerido",
  }),

  nombre: Joi.string().min(3).max(50).required().messages({
    "string.base": "El nombre debe ser texto",
    "string.empty": "El nombre es requerido",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.max": "El nombre no puede exceder 50 caracteres",
    "any.required": "El nombre es requerido",
  }),

  estado: Joi.string()
    .valid("disponible", "ocupada", "inactiva")
    .default("disponible")
    .messages({
      "string.base": "El estado debe ser texto",
      "any.only": 'El estado debe ser "disponible", "ocupada" o "inactiva"',
    }),

  activo: Joi.boolean().default(true).messages({
    "boolean.base": "El campo activo debe ser verdadero o falso",
  }),
});

/**
 * Schema de validación para actualizar una mesa
 */
export const updateMesaSchema = Joi.object({
  numero: Joi.number().integer().min(1).optional().messages({
    "number.base": "El número de mesa debe ser un número",
    "number.integer": "El número de mesa debe ser un número entero",
    "number.min": "El número de mesa debe ser al menos 1",
  }),

  nombre: Joi.string().min(3).max(50).optional().messages({
    "string.base": "El nombre debe ser texto",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.max": "El nombre no puede exceder 50 caracteres",
  }),

  estado: Joi.string()
    .valid("disponible", "ocupada", "inactiva")
    .optional()
    .messages({
      "string.base": "El estado debe ser texto",
      "any.only": 'El estado debe ser "disponible", "ocupada" o "inactiva"',
    }),

  activo: Joi.boolean().optional().messages({
    "boolean.base": "El campo activo debe ser verdadero o falso",
  }),
});
