import { DataSource, DataSourceOptions } from 'typeorm'

export const pgTestingConfig = (testContainerUri: string): DataSourceOptions => ({
    type: 'postgres',
    url: testContainerUri,
    entities: ['src/_common/db/pg/entities/*.ts'],
    migrations: ['src/_common/db/pg/migrations/*.ts'],
    synchronize: true,
})

export const PgTesting = (testContainerUri: string) => new DataSource(pgTestingConfig(testContainerUri))
