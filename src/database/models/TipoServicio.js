import { DataTypes, Model } from "sequelize";
import {sequelize} from "../../config/database.js";

class TipoServicio extends Model {}

TipoServicio.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING(20),
      defaultValue: "#54243C",
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    tiempo_estimado: {
      type: DataTypes.INTEGER,
      defaultValue: 15,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "TipoServicio",
    tableName: "tipo_servicio",
    timestamps: true,
    underscored: true,
  }
);

export default TipoServicio;
