import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';

export class FindUserByCodService {
  private readonly conn: Knex<any, unknown>;
  constructor() {
    this.conn = pgConnection;
  }
  async execute(cod: number) {
    if (cod) {
      return await this.conn('blog.usuarios')
        .where({ cod })
        .first(
          'cod',
          'nome',
          'email',
          'is_primeiro_acesso',
          'is_admin',
          'is_ativo',
          'created_at',
          'updated_at',
        );
    }
  }
}
