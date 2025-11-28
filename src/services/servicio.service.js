import models from "../database/models/index.js";
import utils from "../utils/index.js";
import { Op } from "sequelize";

const { TipoServicio, Turno } = models;
const { getTodayRange } = utils;

class ServicioService {
  async create(servicioData) {
    const { codigo, ...rest } = servicioData;
    const servicio = await TipoServicio.create({
      ...rest,
      codigo: codigo.toUpperCase(),
    });
    return servicio;
  }

  async findAll(filters = {}) {
    const { activo } = filters;
    const where = {};

    if (activo !== undefined) where.activo = activo === "true";

    const servicios = await TipoServicio.findAll({
      where,
      order: [["nombre", "ASC"]],
    });

    return servicios;
  }

  async findById(id) {
    const servicio = await TipoServicio.findByPk(id);

    if (!servicio) {
      throw { status: 404, message: "Servicio no encontrado" };
    }

    const { inicio, fin } = getTodayRange();
    const estadisticas = await Turno.count({
      where: {
        tipo_servicio_id: id,
        created_at: { [Op.gte]: inicio, [Op.lt]: fin },
      },
      group: ["estado"],
    });

    return {
      ...servicio.toJSON(),
      estadisticas,
    };
  }

  async update(id, servicioData) {
    const servicio = await TipoServicio.findByPk(id);
    if (!servicio) {
      throw { status: 404, message: "Servicio no encontrado" };
    }

    const { codigo, ...rest } = servicioData;
    const updateData = { ...rest };
    if (codigo) updateData.codigo = codigo.toUpperCase();

    await servicio.update(updateData);
    return servicio;
  }

  async delete(id) {
    const servicio = await TipoServicio.findByPk(id);
    if (!servicio) {
      throw { status: 404, message: "Servicio no encontrado" };
    }

    await servicio.update({ activo: false });
    return { message: "Servicio eliminado" };
  }
}

export default new ServicioService();
