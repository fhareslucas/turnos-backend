import services from "../services/index.js";
import utils from "../utils/index.js";

const { mesaService } = services;
const { ResponseUtil } = utils;

class MesaController {
  async create(req, res, next) {
    try {
      const mesa = await mesaService.create(req.body);
      return ResponseUtil.success(res, mesa, "Mesa creada exitosamente", 201);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const mesas = await mesaService.findAll(req.query);
      return ResponseUtil.success(res, mesas);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const mesa = await mesaService.findById(req.params.id);
      return ResponseUtil.success(res, mesa);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const mesa = await mesaService.update(req.params.id, req.body);
      return ResponseUtil.success(res, mesa, "Mesa actualizada exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await mesaService.delete(req.params.id);
      return ResponseUtil.success(res, result, "Mesa eliminada exitosamente");
    } catch (error) {
      next(error);
    }
  }
}

export default new MesaController();
