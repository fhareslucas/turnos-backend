import services from "../services/index.js";
import utils from "../utils/index.js";

const { servicioService } = services;
const { ResponseUtil } = utils;

class ServicioController {
  async create(req, res, next) {
    try {
      const servicio = await servicioService.create(req.body);
      return ResponseUtil.success(
        res,
        servicio,
        "Servicio creado exitosamente",
        201
      );
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const servicios = await servicioService.findAll(req.query);
      return ResponseUtil.success(res, servicios);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const servicio = await servicioService.findById(req.params.id);
      return ResponseUtil.success(res, servicio);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const servicio = await servicioService.update(req.params.id, req.body);
      return ResponseUtil.success(
        res,
        servicio,
        "Servicio actualizado exitosamente"
      );
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await servicioService.delete(req.params.id);
      return ResponseUtil.success(
        res,
        result,
        "Servicio eliminado exitosamente"
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new ServicioController();
