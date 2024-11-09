import { Knex } from 'knex';

exports.up = function (knex) {
  return knex.schema.table('Users', function (table) {
    table.boolean('blackListed').defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.table('Users', function (table) {
    table.dropColumn('blackListed');
  });
};
