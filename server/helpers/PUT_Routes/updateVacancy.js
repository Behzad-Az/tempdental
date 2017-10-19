const updateVacancy = (req, res, knex, user_id) => {

  const { title, description, type, anonymous } = req.body;

  const getOwnerOffices = () => knex('offices')
    .select('id')
    .where('owner_id', user_id)
    .whereNull('deleted_at');

  const update = officeIds => knex('vacancies')
    .where('id', req.params.vacancy_id)
    .whereIn('office_id', officeIds)
    .whereNull('deleted_at')
    .update({
      title,
      description,
      type,
      anonymous
    });

  getOwnerOffices()
  .then(offices => update(offices.map(office => office.id)))
  .then(() => res.send(true))
  .catch(err => {
    console.error('Error inside updateVacancy.js: ', err);
    res.status(400).end();
  });

};

module.exports = updateVacancy;
