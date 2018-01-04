
exports.up = function(knex, Promise)  {
  return knex.schema.createTable('notes', function(table){
    table.increments('id').unsigned().primary();
    table.string('title').notNull();
    table.string('journal');
    table.string('author');
    table.timestamps();

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes');
};
