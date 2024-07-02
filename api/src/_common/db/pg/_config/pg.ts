import { DataSource, DataSourceOptions } from 'typeorm'

const pgConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'root',
    database: process.env.POSTGRESS_DB || 'utagawa-agenda-db',
    entities: ['dist/_common/db/entities/*.js'],
    migrations: ['dist/_common/db/migrations/*.js'],
    synchronize: true,
}

export const Pg = new DataSource(pgConfig)
