import Joi from "joi";

/**
 * Schema de validación para registro de usuarios
 */
export const registerSchema = Joi.object({
  nombre: Joi.string().min(3).max(100).required().messages({
    "string.base": "El nombre debe ser texto",
    "string.empty": "El nombre es requerido",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.max": "El nombre no puede exceder 100 caracteres",
    "any.required": "El nombre es requerido",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "El email debe ser texto",
    "string.empty": "El email es requerido",
    "string.email": "Debe proporcionar un email válido",
    "any.required": "El email es requerido",
  }),

  password: Joi.string().min(6).max(100).required().messages({
    "string.base": "La contraseña debe ser texto",
    "string.empty": "La contraseña es requerida",
    "string.min": "La contraseña debe tener al menos 6 caracteres",
    "string.max": "La contraseña no puede exceder 100 caracteres",
    "any.required": "La contraseña es requerida",
  }),

  rol: Joi.string().valid("admin", "operador").default("operador").messages({
    "string.base": "El rol debe ser texto",
    "any.only": 'El rol debe ser "admin" o "operador"',
  }),
});

/**
 * Schema de validación para login de usuarios
 */
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "El email debe ser texto",
    "string.empty": "El email es requerido",
    "string.email": "Debe proporcionar un email válido",
    "any.required": "El email es requerido",
  }),

  password: Joi.string().required().messages({
    "string.base": "La contraseña debe ser texto",
    "string.empty": "La contraseña es requerida",
    "any.required": "La contraseña es requerida",
  }),
});
