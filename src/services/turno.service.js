import models from "../database/models/index.js";
import utils from "../utils/index.js";
import { Op } from "sequelize";

const { Turno, TipoServicio, Mesa, User } = models;
const { generateTurnoCode, getTodayRange } = utils;

class TurnoService {
  async create(turnoData) {
    const { tipo_servicio_id, nombre_cliente, prioridad, observaciones } =
      turnoData;

    const tipoServicio = await TipoServicio.findByPk(tipo_servicio_id);
    if (!tipoServicio || !tipoServicio.activo) {
      throw {
        status: 404,
        message: "Tipo de servicio no encontrado o inactivo",
      };
    }

    const codigo = await generateTurnoCode(tipoServicio.codigo);

    const turno = await Turno.create({
      codigo,
      tipo_servicio_id,
      nombre_cliente,
      prioridad,
      observaciones,
      estado: "en_espera",
    });
j
    return await this.findById(turno.id);
  }

  async findAll(filters = {}) {
    const { estado, tipo_servicio_id, fecha, page = 1, limit = 50 } = filters;

    const where = {};

    if (estado) where.estado = estado;
    if (tipo_servicio_id) where.tipo_servicio_id = tipo_servicio_id;

    if (fecha) {
      const startDate = new Date(fecha);
      const endDate = new Date(fecha);
      endDate.setDate(endDate.getDate() + 1);

      where.created_at = {
        [Op.gte]: startDate,
        [Op.lt]: endDate,
      };
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Turno.findAndCountAll({
      where,
      include: [
        { model: TipoServicio, as: "tipo_servicio" },
        { model: Mesa, as: "mesa" },
        { model: User, as: "operador", attributes: ["id", "nombre", "email"] },
      ],
      order: [
        ["prioridad", "DESC"],
        ["created_at", "ASC"],
      ],
      limit: parseInt(limit),
      offset,
    });

    return {
      turnos: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async findById(id) {
    const turno = await Turno.findByPk(id, {
      include: [
        { model: TipoServicio, as: "tipo_servicio" },
        { model: Mesa, as: "mesa" },
        { model: User, as: "operador", attributes: ["id", "nombre", "email"] },
      ],
    });

    if (!turno) {
      throw { status: 404, message: "Turno no encontrado" };
    }

    return turno;
  }

  async llamar(turnoId, mesaId, userId) {
    const turno = await Turno.findByPk(turnoId);
    if (!turno) {
      throw { status: 404, message: "Turno no encontrado" };
    }

    if (turno.estado !== "en_espera") {
      throw { status: 400, message: "El turno no está en espera" };
    }

    const mesa = await Mesa.findByPk(mesaId);
    if (!mesa || !mesa.activo) {
      throw { status: 404, message: "Mesa no encontrada o inactiva" };
    }

    await turno.update({
      estado: "en_atencion",
      mesa_id: mesaId,
      atendido_por: userId,
      hora_llamado: new Date(),
      hora_atencion: new Date(),
    });

    await mesa.update({ estado: "ocupada" });

    return await this.findById(turnoId);
  }

  async completar(turnoId, observaciones) {
    const turno = await Turno.findByPk(turnoId);
    if (!turno) {
      throw { status: 404, message: "Turno no encontrado" };
    }

    if (turno.estado !== "en_atencion") {
      throw { status: 400, message: "El turno no está en atención" };
    }

    await turno.update({
      estado: "completado",
      hora_finalizacion: new Date(),
      observaciones: observaciones || turno.observaciones,
    });

    if (turno.mesa_id) {
      await Mesa.update(
        { estado: "disponible" },
        { where: { id: turno.mesa_id } }
      );
    }

    return await this.findById(turnoId);
  }

  async cancelar(turnoId, observaciones) {
    const turno = await Turno.findByPk(turnoId);
    if (!turno) {
      throw { status: 404, message: "Turno no encontrado" };
    }

    if (turno.estado === "completado" || turno.estado === "cancelado") {
      throw { status: 400, message: "El turno ya está finalizado" };
    }

    await turno.update({
      estado: "cancelado",
      observaciones: observaciones || turno.observaciones,
    });

    if (turno.mesa_id) {
      await Mesa.update(
        { estado: "disponible" },
        { where: { id: turno.mesa_id } }
      );
    }

    return await this.findById(turnoId);
  }

  async getEstadisticas() {
    const { inicio, fin } = getTodayRange();

    const [enEspera, enAtencion, completados, total] = await Promise.all([
      Turno.count({
        where: {
          estado: "en_espera",
          created_at: { [Op.gte]: inicio, [Op.lt]: fin },
        },
      }),
      Turno.count({
        where: {
          estado: "en_atencion",
          created_at: { [Op.gte]: inicio, [Op.lt]: fin },
        },
      }),
      Turno.count({
        where: {
          estado: "completado",
          created_at: { [Op.gte]: inicio, [Op.lt]: fin },
        },
      }),
      Turno.count({
        where: { created_at: { [Op.gte]: inicio, [Op.lt]: fin } },
      }),
    ]);

    return {
      hoy: {
        en_espera: enEspera,
        en_atencion: enAtencion,
        completados,
        total,
      },
    };
  }
}

export default new TurnoService();
