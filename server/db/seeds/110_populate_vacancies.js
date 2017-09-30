const fs = require('fs');
const vacanciesRaw = fs.readFileSync(__dirname + '/seeded_vacancies.json');
const vacanciesArr = JSON.parse(vacanciesRaw);

exports.seed = function(knex, Promise) {
  return Promise.all(vacanciesArr.map(vacancy => knex('vacancies').insert(vacancy)));
};
