import { DataSource } from 'typeorm'
import { config } from 'dotenv'
config()

export const SqlProvider = {
    provide: 'SQL',
    useFactory: async () => {
        const pg = new DataSource({
            type: 'postgres',
            host: process.env.POSTGRES_HOST || 'localhost',
            port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
            username: process.env.POSTGRES_USER || 'postgres',
            password: process.env.POSTGRES_PASSWORD || 'root',
            database: process.env.POSTGRESS_DB || 'utagawa-agenda-db',
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
        })
        return pg.initialize()
    },
}
