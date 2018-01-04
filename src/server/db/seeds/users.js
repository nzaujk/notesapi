const bcrypt = require('bcryptjs');
exports.seed = (knex, Promise) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync('mike', salt);
  return knex('users').del()
    .then(() => {
      return Promise.join(
        knex('users').insert({
          username: 'mike',
          email: 'mike.kevin@gmail.com',
          password: 'password'
        })
      );
    });
};
