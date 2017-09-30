const fs = require('fs');
const officesRaw = fs.readFileSync(__dirname + '/seeded_offices.json');
const officesArr = JSON.parse(officesRaw);

exports.seed = function(knex, Promise) {
  return Promise.all(officesArr.map(office => knex('offices').insert(office)));
};
