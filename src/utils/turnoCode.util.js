import models from "../database/models/index.js";
import { Op } from "sequelize";
import { getTodayRange } from "./date.util.js";

const { Turno } = models;

const generateTurnoCode = async (codigoServicio) => {
  const { inicio, fin } = getTodayRange();

  const lastTurno = await Turno.findOne({
    where: {
      codigo: {
        [Op.like]: `${codigoServicio}%`,
      },
      created_at: {
        [Op.gte]: inicio,
        [Op.lt]: fin,
      },
    },
    order: [["codigo", "DESC"]],
  });

  let numero = 1;
  if (lastTurno) {
    const parts = lastTurno.codigo.split("-");
    const lastNum = parseInt(parts[parts.length - 1], 10);
    numero = lastNum + 1;
  }

  const numeroStr = String(numero).padStart(3, "0");
  return `${codigoServicio}-${numeroStr}`;
};

export default generateTurnoCode;
