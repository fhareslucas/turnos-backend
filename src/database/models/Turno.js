import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database.js";

class Turno extends Model {}

Turno.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    codigo: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    tipo_servicio_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    mesa_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    estado: {
      type: DataTypes.ENUM(
        "en_espera",
        "en_atencion",
        "completado",
        "cancelado"
      ),
      defaultValue: "en_espera",
      allowNull: false,
    },
    prioridad: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    nombre_cliente: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    atendido_por: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    hora_llamado: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    hora_atencion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    hora_finalizacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Turno",
    tableName: "turno",
    timestamps: true,
    underscored: true,
  }
);

export default Turno;
