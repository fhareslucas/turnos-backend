import { DataTypes, Model } from "sequelize";
import {sequelize}  from "../../config/database.js";

class Mesa extends Model {}

Mesa.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("disponible", "ocupada", "inactiva"),
      defaultValue: "disponible",
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Mesa",
    tableName: "mesa",
    timestamps: true,
    underscored: true,
  }
);

export default Mesa;
