const fs = require('fs');
const vacancyDatesRaw = fs.readFileSync(__dirname + '/seeded_vacancy_dates.json');
const vacancyDatesArr = JSON.parse(vacancyDatesRaw);

exports.seed = function(knex, Promise) {
  return Promise.all(vacancyDatesArr.map(date => knex('vacancy_dates').insert(date)));
};
