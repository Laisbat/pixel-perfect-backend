import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';
import { dtHoje } from '../../helpers/time';
import { tPost } from '../../Interfaces/tPost';
import { FindPostService } from './FindPostService';

type Props = tPost;

export class StorePostService {
  private readonly conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }

  public async execute({
    id,
    title,
    content,
    published,
    author,
    authorId,
    likes,
  }: Props) {
    const created_at = dtHoje();
    const payload: Props = {
      id,
      title,
      content,
      published,
      author,
      authorId,
      likes,
      created_at: created_at,
      updated_at: created_at,
    };

    if (id) {
      delete payload.id;
      delete payload.created_at;

      await this.conn('blog.post').update(payload).where({ id });
    } else {
      delete payload.id;
      delete payload.updated_at;

      const [insert] = await this.conn('blog.post')
        .insert(payload)
        .returning('id');

      id = insert.id;
    }

    const service = new FindPostService();
    const result = await service.execute(Number(id));
    return result;
  }
}
