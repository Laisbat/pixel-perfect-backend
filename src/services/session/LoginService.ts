import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Knex } from 'knex';
import env from '../../configs/env';
import pgConnection from '../../databases/pgConnection';

export class LoginService {
  private readonly conn: Knex<any, unknown>;

  constructor() {
    this.conn = pgConnection;
  }

  public async execute(login: string, password: string) {
    if (!login || !password) throw new Error('Login ou senha inválidos. ');

    const usuario = await this.conn('blog.usuarios')
      .where('email', login)
      .first('*');

    if (!usuario) throw new Error('Login ou senha inválidos.');

    if (!usuario.is_ativo) throw new Error('Usuário inativo.');

    const passwordMatch = await compare(password, usuario.senha);

    delete usuario.senha;

    if (!passwordMatch) throw new Error('Login ou senha inválidos.');

    let payload = { cod_usuario: usuario.cod };

    const accessToken = sign(payload, env.ACCESS_TOKEN_SECRET, {
      subject: usuario.cod.toString(),
      expiresIn: env.ACCESS_TOKEN_EXPIRATION
        ? `${env.ACCESS_TOKEN_EXPIRATION}s`
        : '360s',
    });

    const refreshToken = sign(payload, env.REFRESH_TOKEN_SECRET, {
      subject: usuario.cod.toString(),
      expiresIn: env.REFRESH_TOKEN_EXPIRATION
        ? `${env.REFRESH_TOKEN_EXPIRATION}s`
        : '600s',
    });

    if (usuario.is_primeiro_acesso)
      await this.conn('blog.usuarios')
        .update({ is_primeiro_acesso: false })
        .where({ cod: usuario.cod });

    return { accessToken, refreshToken, usuario };
  }
}
