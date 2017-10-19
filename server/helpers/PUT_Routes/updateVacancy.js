const updateVacancy = (req, res, knex, user_id) => {

  const type = req.body.type.trim();
  const title = req.body.title.trim();
  const description = req.body.description.trim();
  const anonymous = req.body.anonymous;
  const start_date = req.body.startDate;
  const end_date = type === 'Temp' ? req.body.endDate : null;
  const office_id = req.body.officeId.trim();

  const getOwnerOffices = () => knex('offices')
    .select('id')
    .where('owner_id', user_id)
    .whereNull('deleted_at');

  const update = verifiedOfficeIds => knex('vacancies')
    .where('id', req.params.vacancy_id)
    .whereIn('office_id', verifiedOfficeIds)
    .whereNull('deleted_at')
    .update({
      title,
      description,
      type,
      anonymous,
      start_date,
      end_date,
      office_id
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
