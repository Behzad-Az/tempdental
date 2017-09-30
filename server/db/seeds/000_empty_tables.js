exports.seed = function(knex, Promise) {
  return Promise.all([
    knex.raw('delete from applications where 1=1'),
    knex.raw('delete from applicant_avail_dates where 1=1'),
    knex.raw('delete from vacancy_dates where 1=1'),
    knex.raw('delete from vacancies where 1=1'),
    knex.raw('delete from offices where 1=1'),
    knex.raw('delete from users where 1=1')
  ]);
};
