class ResponseUtil {
  static success(
    res,
    data = null,
    message = "Operación exitosa",
    statusCode = 200
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(
    res,
    message = "Error en la operación",
    statusCode = 400,
    errors = null
  ) {
    const response = {
      success: false,
      message,
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }

  static notFound(res, message = "Recurso no encontrado") {
    return res.status(404).json({
      success: false,
      message,
    });
  }

  static unauthorized(res, message = "No autorizado") {
    return res.status(401).json({
      success: false,
      message,
    });
  }

  static forbidden(res, message = "Acceso denegado") {
    return res.status(403).json({
      success: false,
      message,
    });
  }
}

export default ResponseUtil;
