import { Knex } from 'knex';
import 'dotenv/config';
import { DATABASE_URL } from './src/config';

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            database: 'demo_credit',
            password: 'jeremiah'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './src/models/knex/migrations'
        },
        seeds: {
            directory: './src/models/knex/seeds'
        },
    },
    production: {
        client: 'mysql2',
        connection: `mysql2://root:jeremiah@127.0.0.1:3306/demo_credit`,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './src/models/knex/migrations'
        },
        seeds: {
            directory: './src/models/knex/seeds'
        },
    }
};

export default config;
