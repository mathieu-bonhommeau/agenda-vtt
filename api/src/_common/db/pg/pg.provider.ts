import { config } from 'dotenv'
import { Pg } from './_config/pg'
config()

export const PgProvider = {
    provide: 'SQL',
    useFactory: async () => {
        return Pg.initialize()
    },
}
