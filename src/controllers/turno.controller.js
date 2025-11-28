import services from "../services/index.js";
import utils from "../utils/index.js";

const { turnoService } = services;
const { ResponseUtil } = utils;

class TurnoController {
  async create(req, res, next) {
    try {
      const turno = await turnoService.create(req.body);
      return ResponseUtil.success(res, turno, "Turno creado exitosamente", 201);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const result = await turnoService.findAll(req.query);
      return ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const turno = await turnoService.findById(req.params.id);
      return ResponseUtil.success(res, turno);
    } catch (error) {
      next(error);
    }
  }

  async llamar(req, res, next) {
    try {
      const { id } = req.params;
      const { mesa_id } = req.body;
      const turno = await turnoService.llamar(id, mesa_id, req.user.id);
      return ResponseUtil.success(res, turno, "Turno llamado exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async completar(req, res, next) {
    try {
      const { id } = req.params;
      const { observaciones } = req.body;
      const turno = await turnoService.completar(id, observaciones);
      return ResponseUtil.success(res, turno, "Turno completado exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async cancelar(req, res, next) {
    try {
      const { id } = req.params;
      const { observaciones } = req.body;
      const turno = await turnoService.cancelar(id, observaciones);
      return ResponseUtil.success(res, turno, "Turno cancelado");
    } catch (error) {
      next(error);
    }
  }

  async getEstadisticas(req, res, next) {
    try {
      const estadisticas = await turnoService.getEstadisticas();
      return ResponseUtil.success(res, estadisticas);
    } catch (error) {
      next(error);
    }
  }
}

export default new TurnoController();
