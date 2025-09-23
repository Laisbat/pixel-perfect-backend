import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';
import { dtHoje } from '../../helpers/time';
import { FindUserByCodService } from './FindUserByCodService';

export class ChangeActiveUserByCodService {
  private readonly conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }
  public async execute(cod: number) {
    if (!cod) throw new Error('Dados inválidos.');

    await this.conn('blog.usuarios')
      .where({ cod })
      .update({ is_ativo: false, updated_at: dtHoje() });

    const service = new FindUserByCodService();
    const result = await service.execute(cod);
    return result;
  }
}
