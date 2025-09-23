import { Request, Response } from 'express';
import logger from '../middlewares/logger';
import { ChangePasswordService } from '../services/session/ChangePasswordService';
import { LoginService } from '../services/session/LoginService';
import { RefreshTokenService } from '../services/session/RefreshTokenService';

export class SessionController {
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const service = new LoginService();
      const output = await service.execute(email, password);
      return res
        .status(200)
        .json({ data: output, message: 'Login realizado com sucesso!' });
    } catch (err) {
      logger.error(err);
      return res.status(400).json({ message: (err as Error).message });
    }
  }
  public async recoverPassword(req: Request, res: Response): Promise<Response> {
    try {
      const { login } = req.body;
      return res.status(200).json({ message: 'Senha enviada com sucesso!' });
    } catch (err) {
      logger.error(err);
      return res.status(400).json({ message: (err as Error).message });
    }
  }
  public async changePassword(req: Request, res: Response): Promise<Response> {
    try {
      const cod_usuario = req.usuario.cod_usuario;
      const { newPassword, oldPassword } = req.body;
      const service = new ChangePasswordService();
      const output = await service.execute({
        cod_usuario,
        newPassword,
        oldPassword,
      });
      return res
        .status(200)
        .json({ data: output, message: 'Senha alterada com sucesso!' });
    } catch (err) {
      logger.error(err);
      return res.status(400).json({ message: (err as Error).message });
    }
  }
  public async refreshToken(req: Request, res: Response): Promise<Response> {
    try {
      const { refreshToken } = req.body;
      const service = new RefreshTokenService();
      const output = await service.execute(refreshToken);
      return res
        .status(200)
        .json({ data: output, message: 'Token atualizado com sucesso!' });
    } catch (err) {
      logger.error(err);
      return res.status(400).json({ message: (err as Error).message });
    }
  }
  public async logout(req: Request, res: Response): Promise<Response> {
    try {
      return res.status(200).json({ message: 'Logout realizado com sucesso!' });
    } catch (err) {
      logger.error(err);
      return res.status(400).json({ message: (err as Error).message });
    }
  }
}
