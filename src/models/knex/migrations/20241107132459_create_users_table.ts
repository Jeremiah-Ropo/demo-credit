import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('Users', (table) => {
        table.increments('id').primary();
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.timestamp('last_login').defaultTo(knex.fn.now());
        table.boolean('deleted').defaultTo(false);
        table.string('walletId');
        table.boolean('blackListed').defaultTo(false);
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('Users');
}

