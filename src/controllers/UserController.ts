import { Request, Response } from 'express';
import logger from '../middlewares/logger';
import { ChangeActiveUserByCodService } from '../services/user/ChangeActiveUserByCodService';
import { FindUserByCodService } from '../services/user/FindUserByCodService';
import { StoreUserService } from '../services/user/StoreUserService';

export class UserController {
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const { cod, nome, email, senha, is_admin, is_primeiro_acesso } =
        req.body;
      const service = new StoreUserService();
      const output = await service.execute({
        cod,
        email,
        nome,
        senha,
        is_admin,
        is_primeiro_acesso,
      });
      return res
        .status(201)
        .json({ data: output, message: 'Usuário criado com sucesso!' });
    } catch (err) {
      logger.error(err);
      return res.status(400).json({ message: (err as Error).message });
    }
  }

  public async getUserProfile(req: Request, res: Response): Promise<Response> {
    try {
      const cod = req.params.id;
      const service = new FindUserByCodService();
      const output = await service.execute(parseInt(cod));
      return res
        .status(200)
        .json({ data: output, message: 'Usuário encontrado com sucesso!' });
    } catch (err) {
      logger.error(err);
      return res.status(400).json({ message: (err as Error).message });
    }
  }

  public async changeActive(req: Request, res: Response): Promise<Response> {
    try {
      const cod = req.params.id;
      const service = new ChangeActiveUserByCodService();
      const output = await service.execute(parseInt(cod));
      return res.status(200).json({
        data: output,
        message: 'Status do usuário alterado com sucesso!',
      });
    } catch (err) {
      logger.error(err);
      return res.status(400).json({ message: (err as Error).message });
    }
  }
}
