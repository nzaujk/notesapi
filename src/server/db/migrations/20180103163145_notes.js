
exports.up = function(knex, Promise)  {
  return knex.schema.createTable('notes', function(table){
    table.increments();
    table.text('title');
    table.text('journal');
    table.text('author');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes');
};
