import services from "../services/index.js";
import utils from "../utils/index.js";

const { authService } = services;
const { ResponseUtil } = utils;

class AuthController {
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);
      return ResponseUtil.success(
        res,
        result,
        "Usuario registrado exitosamente",
        201
      );
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const result = await authService.login(req.body);
      return ResponseUtil.success(res, result, "Login exitoso");
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const user = await authService.getProfile(req.user.id);
      return ResponseUtil.success(res, user);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
