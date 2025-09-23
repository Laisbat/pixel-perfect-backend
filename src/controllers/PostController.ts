import { Request, Response } from 'express';
import logger from '../middlewares/logger';
import { FindPostService } from '../services/posts/FindPostService';
import { StorePostService } from '../services/posts/StorePostService';

export class PostController {
  public async find(req: Request, res: Response): Promise<Response> {
    try {
      const { cod } = req.params;
      const service = new FindPostService();
      const output = await service.execute(Number(cod));
      return res.status(200).json(output);
    } catch (err) {
      logger.error(err);
      return res.status(400).send((err as Error).message);
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const {
        id,
        created_at,
        updated_at,
        title,
        content,
        published,
        author,
        authorId,
        likes,
      } = req.body;
      const service = new StorePostService();
      const output = await service.execute({
        id,
        created_at,
        updated_at,
        title,
        content,
        published,
        author,
        authorId,
        likes,
      });
      return res
        .status(200)
        .json({ data: output, message: 'Post criado com sucesso!' });
    } catch (err) {
      logger.error(err);
      return res.status(400).json(err as Error);
    }
  }
}
