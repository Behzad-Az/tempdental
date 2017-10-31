const getVacancyApplications = (req, res, knex, user_id) => {

  const { vacancy_id } = req.params;
  let applications;

  const findApplications = () => knex('users')
    .leftJoin('applications', 'users.id', 'applications.candidate_id')
    .leftJoin('vacancies', 'applications.vacancy_id', 'vacancies.id')
    .leftJoin('offices', 'vacancies.office_id', 'offices.id')
    .select(
      'applications.id', 'applications.candidate_id', 'applications.vacancy_id', 'applications.employer_viewed',
      'users.full_name as name', 'users.email', 'users.phone_number as phone', 'users.intro', 'users.prefix'
    )
    .where('vacancies.id', vacancy_id)
    .andWhere('offices.owner_id', user_id)
    .whereNotNull('applications.candidate_apply_date')
    .andWhere('applications.employer_deleted', false)
    .whereNull('applications.deleted_at')
    .whereNull('offices.deleted_at')
    .whereNull('users.deleted_at')
    .whereNull('vacancies.deleted_at');

  const updateApplicationViewed = applIds => knex('applications')
    .whereIn('id', applIds)
    .andWhere({ vacancy_id })
    .update({ employer_viewed: true });

  findApplications()
  .then(foundApplications => {
    applications = foundApplications;
    return updateApplicationViewed(applications.map(appl => appl.id));
  })
  .then(() => res.send({ applications }))
  .catch(err => {
    console.error('Error inside getVacancyApplications.js: ', err);
    res.status(400).end();
  });

};

module.exports = getVacancyApplications;
