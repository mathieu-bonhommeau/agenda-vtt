import { DataSource, DataSourceOptions } from 'typeorm'

const pgTestingConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'root',
    database: process.env.POSTGRESS_DB || 'utagawa-agenda-db',
    entities: ['src/_common/db/pg/entities/*.ts'],
    migrations: ['src/_common/db/pg/migrations/*.ts'],
    synchronize: true,
}

export const PgTesting = new DataSource(pgTestingConfig)
