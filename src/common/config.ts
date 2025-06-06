import { ConnectOptions } from "typeorm";
import { PostgresConnectionCredentialsOptions } from "typeorm/driver/postgres/PostgresConnectionCredentialsOptions";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const ConfigORM: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ['/*/.entity{.ts,.js}'],
  synchronize: false,
}