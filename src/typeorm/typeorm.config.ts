import { TypeOrmModule } from "@nestjs/typeorm";
import { parse } from "pg-connection-string";
import * as dotenv from "dotenv";

import { User } from "./entities/users.entity";

dotenv.config();

const pgConnectionString = process.env.DB_CONNECTION_STRING;

if (!pgConnectionString)
  throw new Error("DB_CONNECTION_STRING is  not defined");

const config = parse(pgConnectionString);
console.log(config);

export const TypeormConfig = TypeOrmModule.forRoot({
  type: "postgres",
  host: config.host,
  port: parseInt(config.port, 10),
  username: config.user,
  password: config.password,
  database: config.database,
  entities: [User],
  ssl: {
    rejectUnauthorized: false, // required for ssl connection
  },
  synchronize: true, // set to false in prod
  logging: true,
});
