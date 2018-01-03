
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Adventures in Watamu'},
        {author: 'Joe Nzau'},
        {journal: 'The trip into an Adventure that turned into an adventure.'}

      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Adventures in Watamu'},
        {author: 'Joe Nzau'},
        {journal: 'The trip into an Adventure that turned into an adventure.'},
        {created_at: '2017-12-12 13:00'},
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'The Break up'},
        {author: 'Joe Nzau'},
        {journal: 'The young and the restless. The story of love pain and strength'},
        {created_at: '2017-12-12 15:00'},
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'The rebound'},
        {author: 'Joe Nzau'},
        {journal: 'My best date turned out to be a rebound.'},
        {created_at: '2017-12-23 03:00'},
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Game night'},
        {author: 'Joe Nzau'},
        {journal: 'New year new experiences and board games.'},
        {created_at: '2018-01-01 13:00'},
      ]);
    });
};
