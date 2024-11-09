import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('Wallets', (table) => {
        table.increments('id').primary();
        table.string('walletName').notNullable();
        table.string('walletId').notNullable();
        table.integer('userId').unsigned().references('id').inTable('Users').notNullable();
        table.integer('walletBalance').defaultTo(0);
        table.boolean('freezed').defaultTo(false);
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('Wallets');
}

