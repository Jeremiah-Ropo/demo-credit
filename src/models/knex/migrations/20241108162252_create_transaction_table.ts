import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('Transactions', (table) => {
        table.increments('id').primary();
        table.string('walletId').notNullable();
        table.string('transactionType').notNullable();
        table.string('transactionStatus').notNullable();
        table.string('reference').notNullable();
        table.integer('amount').defaultTo(0);
        table.integer('balanceBefore').defaultTo(0);
        table.integer('balanceAfter').defaultTo(0);
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('Transactions');
}
