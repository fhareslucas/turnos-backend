import models from "../database/models/index.js";
import jwtConfig from "../config/jwt.js";
import jwt from "jsonwebtoken";

const { User } = models;

class AuthService {
  async register(userData) {
    const { nombre, email, password, rol } = userData;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw { status: 409, message: "El email ya está registrado" };
    }

    const user = await User.create({ nombre, email, password, rol });

    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    return {
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
    };
  }

  async login(credentials) {
    const { email, password } = credentials;

    const user = await User.findOne({ where: { email } });
    if (!user || !user.activo) {
      throw { status: 401, message: "Credenciales inválidas" };
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw { status: 401, message: "Credenciales inválidas" };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    return {
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
    };
  }

  async getProfile(userId) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      throw { status: 404, message: "Usuario no encontrado" };
    }

    return user;
  }
}

export default new AuthService();
