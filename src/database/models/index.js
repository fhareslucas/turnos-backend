import {sequelize} from "../../config/database.js";
import User from "./User.js";
import TipoServicio from "./TipoServicio.js";
import Mesa from "./Mesa.js";
import Turno from "./Turno.js";

Turno.belongsTo(TipoServicio, {
  foreignKey: "tipo_servicio_id",
  as: "tipo_servicio",
});

Turno.belongsTo(Mesa, {
  foreignKey: "mesa_id",
  as: "mesa",
});

Turno.belongsTo(User, {
  foreignKey: "atendido_por",
  as: "operador",
});

TipoServicio.hasMany(Turno, {
  foreignKey: "tipo_servicio_id",
  as: "turnos",
});

Mesa.hasMany(Turno, {
  foreignKey: "mesa_id",
  as: "turnos",
});

User.hasMany(Turno, {
  foreignKey: "atendido_por",
  as: "turnos_atendidos",
});

export default {
  sequelize,
  User,
  TipoServicio,
  Mesa,
  Turno,
};
