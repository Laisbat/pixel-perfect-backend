import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';

export class RecoverPasswordService {
  private readonly conn: Knex<any, unknown>;
  constructor() {
    this.conn = pgConnection;
  }
  public async execute({ login, email }: { login: string; email: string }) {
    if (!login || !email) throw new Error('Dados incompletos');

    const user = await this.conn('blog.usuarios')
      .where({ login, email })
      .first();

    if (!user) throw new Error('Usuário não encontrado');

    return { message: 'Instruções de recuperação de senha enviadas' };
  }
}
