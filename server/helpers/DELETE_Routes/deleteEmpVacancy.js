const deleteEmpVacancy = (req, res, knex, user_id) => {

  const { vacancy_id } = req.params;

  const getOwnerOfficeIds = () => knex('offices')
    .select('id')
    .where('owner_id', user_id)
    .whereNull('deleted_at');

  const markVacancyDeleted = verifiedOfficeIds => knex('vacancies')
    .where('id', vacancy_id)
    .whereIn('office_id', verifiedOfficeIds)
    .whereNull('deleted_at')
    .update({ deleted_at: knex.fn.now() });

  const markAllVacanciesDeleted = verifiedOfficeIds => knex('vacancies')
    .whereIn('office_id', verifiedOfficeIds)
    .whereNull('deleted_at')
    .update({ deleted_at: knex.fn.now() });

  getOwnerOfficeIds()
  .then(officeIds => vacancy_id === '_all' ?
                     markAllVacanciesDeleted(officeIds.map(office => office.id)) :
                     markVacancyDeleted(officeIds.map(office => office.id))
  )
  .then(() => res.send(true))
  .catch(err => {
    console.error('Error inside deleteEmpVacancy.js: ', err);
    res.status(400).end();
  });

};

module.exports = deleteEmpVacancy;
