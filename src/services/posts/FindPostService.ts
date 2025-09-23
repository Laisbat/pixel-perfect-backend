import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';

export class FindPostService {
  private readonly conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }

  public async execute(id?: number) {
    const query = this.conn('blog.posts').select(
      'id',
      'created_at',
      'updated_at',
      'title',
      'content',
      'published',
      'author',
      'authorId',
      'likes',
    );

    if (id) query.where({ id }).first();

    const post = await query;

    if (!post) throw new Error('Post não encontrado.');

    return post;
  }
}
