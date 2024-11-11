import { knex } from 'knex';
import 'dotenv/config';
import config from '../../knexfile';

const db = knex(config[process.env.NODE_ENV || 'development']);
console.log("db")
export { db };