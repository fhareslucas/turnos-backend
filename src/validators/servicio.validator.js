import Joi from "joi";

/**
 * Schema de validación para crear un tipo de servicio
 */
export const createServicioSchema = Joi.object({
  nombre: Joi.string().min(3).max(50).required().messages({
    "string.base": "El nombre debe ser texto",
    "string.empty": "El nombre es requerido",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.max": "El nombre no puede exceder 50 caracteres",
    "any.required": "El nombre es requerido",
  }),

  codigo: Joi.string().min(1).max(10).uppercase().required().messages({
    "string.base": "El código debe ser texto",
    "string.empty": "El código es requerido",
    "string.min": "El código debe tener al menos 1 carácter",
    "string.max": "El código no puede exceder 10 caracteres",
    "any.required": "El código es requerido",
  }),

  descripcion: Joi.string().max(500).optional().allow("").messages({
    "string.base": "La descripción debe ser texto",
    "string.max": "La descripción no puede exceder 500 caracteres",
  }),

  color: Joi.string()
    .pattern(/^#[0-9A-Fa-f]{6}$/)
    .default("#54243C")
    .messages({
      "string.base": "El color debe ser texto",
      "string.pattern.base":
        "El color debe ser un código hexadecimal válido (ej: #54243C)",
    }),

  tiempo_estimado: Joi.number().integer().min(1).max(300).default(15).messages({
    "number.base": "El tiempo estimado debe ser un número",
    "number.integer": "El tiempo estimado debe ser un número entero",
    "number.min": "El tiempo estimado debe ser al menos 1 minuto",
    "number.max": "El tiempo estimado no puede exceder 300 minutos",
  }),

  activo: Joi.boolean().default(true).messages({
    "boolean.base": "El campo activo debe ser verdadero o falso",
  }),
});

/**
 * Schema de validación para actualizar un tipo de servicio
 */
export const updateServicioSchema = Joi.object({
  nombre: Joi.string().min(3).max(50).optional().messages({
    "string.base": "El nombre debe ser texto",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.max": "El nombre no puede exceder 50 caracteres",
  }),

  codigo: Joi.string().min(1).max(10).uppercase().optional().messages({
    "string.base": "El código debe ser texto",
    "string.min": "El código debe tener al menos 1 carácter",
    "string.max": "El código no puede exceder 10 caracteres",
  }),

  descripcion: Joi.string().max(500).optional().allow("").messages({
    "string.base": "La descripción debe ser texto",
    "string.max": "La descripción no puede exceder 500 caracteres",
  }),

  color: Joi.string()
    .pattern(/^#[0-9A-Fa-f]{6}$/)
    .optional()
    .messages({
      "string.base": "El color debe ser texto",
      "string.pattern.base":
        "El color debe ser un código hexadecimal válido (ej: #54243C)",
    }),

  tiempo_estimado: Joi.number().integer().min(1).max(300).optional().messages({
    "number.base": "El tiempo estimado debe ser un número",
    "number.integer": "El tiempo estimado debe ser un número entero",
    "number.min": "El tiempo estimado debe ser al menos 1 minuto",
    "number.max": "El tiempo estimado no puede exceder 300 minutos",
  }),

  activo: Joi.boolean().optional().messages({
    "boolean.base": "El campo activo debe ser verdadero o falso",
  }),
});
