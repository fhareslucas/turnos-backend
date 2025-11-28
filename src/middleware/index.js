import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwt.js";
import utils from "../utils/index.js";

const { ResponseUtil } = utils;

/**
 * Middleware de autenticación JWT
 * Verifica el token JWT en el header Authorization
 */
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return ResponseUtil.error(res, "Token no proporcionado", 401);
    }

    const token = authHeader.substring(7); // Remover 'Bearer '

    try {
      const decoded = jwt.verify(token, jwtConfig.secret);
      req.user = decoded;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return ResponseUtil.error(res, "Token expirado", 401);
      }
      return ResponseUtil.error(res, "Token inválido", 401);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware para verificar rol de administrador
 * Debe usarse después del middleware authenticate
 */
export const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return ResponseUtil.error(res, "Usuario no autenticado", 401);
    }

    if (req.user.rol !== "admin") {
      return ResponseUtil.error(
        res,
        "Acceso denegado. Se requiere rol de administrador",
        403
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware de validación con Joi
 * @param {JoiSchema} schema - Schema de Joi para validar
 */
export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      const { error, value } = schema.validate(req.body, { abortEarly: false });

      if (error) {
        const validationErrors = error.details.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return ResponseUtil.error(
          res,
          "Error de validación",
          400,
          validationErrors
        );
      }

      req.body = value; // Usar el valor validado (con defaults aplicados)
      next();
    } catch (err) {
      next(err);
    }
  };
};

/**
 * Middleware de manejo de errores global
 * Debe ser el último middleware en la cadena
 */
export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Error personalizado con status
  if (err.status) {
    return ResponseUtil.error(res, err.message, err.status, err.data);
  }

  // Error de Sequelize
  if (err.name === "SequelizeValidationError") {
    const errors = err.errors.map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return ResponseUtil.error(res, "Error de validación", 400, errors);
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    const errors = err.errors.map((e) => ({
      field: e.path,
      message: `El valor de ${e.path} ya existe`,
    }));
    return ResponseUtil.error(res, "Registro duplicado", 409, errors);
  }

  if (err.name === "SequelizeForeignKeyConstraintError") {
    return ResponseUtil.error(
      res,
      "Error de referencia: el registro relacionado no existe",
      400
    );
  }

  // Error genérico
  return ResponseUtil.error(
    res,
    process.env.NODE_ENV === "development"
      ? err.message
      : "Error interno del servidor",
    500
  );
};
