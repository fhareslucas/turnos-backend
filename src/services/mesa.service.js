import models from "../database/models/index.js";

const { Mesa, Turno } = models;

class MesaService {
  async create(mesaData) {
    const mesa = await Mesa.create(mesaData);
    return mesa;
  }

  async findAll(filters = {}) {
    const { activo, estado } = filters;
    const where = {};

    if (activo !== undefined) where.activo = activo === "true";
    if (estado) where.estado = estado;

    const mesas = await Mesa.findAll({
      where,
      order: [["numero", "ASC"]],
      include: [
        {
          model: Turno,
          as: "turnos",
          where: { estado: "en_atencion" },
          required: false,
        },
      ],
    });

    return mesas;
  }

  async findById(id) {
    const mesa = await Mesa.findByPk(id, {
      include: [
        {
          model: Turno,
          as: "turnos",
          where: { estado: "en_atencion" },
          required: false,
        },
      ],
    });

    if (!mesa) {
      throw { status: 404, message: "Mesa no encontrada" };
    }

    return mesa;
  }

  async update(id, mesaData) {
    const mesa = await Mesa.findByPk(id);
    if (!mesa) {
      throw { status: 404, message: "Mesa no encontrada" };
    }

    await mesa.update(mesaData);
    return mesa;
  }

  async delete(id) {
    const mesa = await Mesa.findByPk(id);
    if (!mesa) {
      throw { status: 404, message: "Mesa no encontrada" };
    }

    await mesa.update({ activo: false, estado: "inactiva" });
    return { message: "Mesa eliminada" };
  }
}

export default new MesaService();
