import { School } from './entity/School';
import { Password } from './entity/Password';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { initEnv } from './utils/env';

initEnv();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [ School, Password ],
    migrations: [],
    subscribers: [],
});