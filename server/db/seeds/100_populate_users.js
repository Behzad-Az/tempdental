const fs = require('fs');
const usersRaw = fs.readFileSync(__dirname + '/seeded_users.json');
const usersArr = JSON.parse(usersRaw);

exports.seed = function(knex, Promise) {
  return Promise.all(usersArr.map(user => knex('users').insert(user)));
};
