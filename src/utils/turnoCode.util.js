import models from "../database/models/index.js";
import { Op } from "sequelize";

const { Turno } = models;

const generateTurnoCode = async (codigoServicio) => {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const manana = new Date(hoy);
  manana.setDate(manana.getDate() + 1);

  const count = await Turno.count({
    where: {
      codigo: {
        [Op.like]: `${codigoServicio}%`,
      },
      created_at: {
        [Op.gte]: hoy,
        [Op.lt]: manana,
      },
    },
  });

  const numero = String(count + 1).padStart(3, "0");
  return `${codigoServicio}-${numero}`;
};

export default generateTurnoCode;
