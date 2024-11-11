import 'dotenv/config';

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/models/knex/migrations',
    },
    seeds: {
      directory: './src/models/knex/seeds',
    },
    },
    production: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        },
        pool: {
          min: 2,
          max: 10,
        },
        migrations: {
          directory: './src/models/knex/migrations',
        },
        seeds: {
          directory: './src/models/knex/seeds',
        },
      }
};

