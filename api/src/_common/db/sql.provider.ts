import { config } from 'dotenv'
import { Sql } from './_config/sql'
config()

export const SqlProvider = {
    provide: 'SQL',
    useFactory: async () => {
        return Sql.initialize()
    },
}
