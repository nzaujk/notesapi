exports.seed = (knex, Promise) => {
  return knex('notes').del()
    .then(() => {
      return knex('notes').insert({
        title: 'The Great Divorce',
        author: 'Joe Nzau',
        journal: 'Like the tides in the sea, even the good things come to an end....',
      });
    })
    .then(() => {
      return knex('notes').insert({
        title: 'Adventures in Watamu',
        author: 'Joe Nzau',
        journal: 'Pick your best travel buddies, open google maps, choose a location and experience the adventures....',
      });
    })
    .then(() => {
      return knex('notes').insert({
        title: 'The rebound',
        author: 'Joe Nzau',
        journal: 'From a good company to ice cream to fireworks to a goodbye....',
      });
    });
};