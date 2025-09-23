import { hash } from 'bcryptjs';
import { Knex } from 'knex';
import pgConnection from '../../databases/pgConnection';
import { dtHoje } from '../../helpers/time';
import { FindUserByCodService } from './FindUserByCodService';

type tProps = {
  cod?: number;
  nome: string;
  email: string;
  senha?: string;
  is_primeiro_acesso?: boolean;
  is_admin?: boolean;
  is_ativo?: boolean;
  created_at?: string;
  updated_at?: string;
};
export class StoreUserService {
  private readonly conn: Knex<any, unknown>;
  constructor() {
    this.conn = pgConnection;
  }

  public async execute({
    cod,
    email,
    nome,
    is_admin = false,
    is_ativo = true,
    is_primeiro_acesso = true,
    senha,
  }: tProps) {
    const hoje = dtHoje();
    const payload: tProps = {
      cod: cod,
      nome: nome,
      email: email,
      is_primeiro_acesso: is_primeiro_acesso,
      is_admin: is_admin,
      is_ativo: is_ativo,
      created_at: hoje,
      updated_at: hoje,
    };

    const userExists = await this.conn('blog.usuarios')
      .where({ email })
      .first();

    if (userExists && !cod) throw new Error('Usuário ja cadastrado.');

    if (senha) {
      payload.senha = await hash(senha, 10);
    }

    if (cod) {
      delete payload.cod;
      delete payload.created_at;

      await this.conn('blog.usuarios').where({ cod: cod }).update(payload);
    } else {
      delete payload.cod;
      delete payload.updated_at;

      const [insert] = await this.conn('blog.usuarios')
        .insert(payload)
        .returning('cod');
      cod = insert.cod;
    }

    const service = new FindUserByCodService();
    const result = await service.execute(Number(cod));
    return result;
  }
}
