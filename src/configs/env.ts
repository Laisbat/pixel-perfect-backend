import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  APP_PORT: z.coerce.number().default(3000),
  DATABASE_CLIENT: z.string().nonempty(),
  DB_HOST: z.string().nonempty(),
  DB_PORT: z.coerce.number().default(5432),
  DB_USER: z.string().nonempty(),
  DB_NAME: z.string().nonempty(),
  DB_PASSWORD: z.string().nonempty(),
  ACCESS_TOKEN_SECRET: z.string().nonempty(),
  REFRESH_TOKEN_SECRET: z.string().nonempty(),
  ACCESS_TOKEN_EXPIRATION: z.coerce.number().nullable().default(360),
  REFRESH_TOKEN_EXPIRATION: z.coerce.number().nullable().default(600),
});

export default envSchema.parse({
  NODE_ENV: 'development',
  APP_PORT: 3003,
  DATABASE_CLIENT: 'pg',
  DB_HOST: 'postgres.railway.internal',
  DB_PORT: 5432,
  DB_USER: 'postgres',
  DB_NAME: 'postgres',
  DB_PASSWORD: 'WFGXMjHLXuaRfqWSpcsAgNpVZnHeEbID',

  ACCESS_TOKEN_SECRET: 'iusahiuasdhidihudihu',
  REFRESH_TOKEN_SECRET: 'oasioasouasdouasouhsa',
  ACCESS_TOKEN_EXPIRATION: 15,
});
