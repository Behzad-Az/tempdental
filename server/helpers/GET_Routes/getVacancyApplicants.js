const getVacancyApplicants = (req, res, knex, user_id) => {

  const findApplicants = () => knex('users')
    .leftJoin('applications', 'users.id', 'applications.candidate_id')
    .leftJoin('vacancies', 'applications.vacancy_id', 'vacancies.id')
    .leftJoin('offices', 'vacancies.office_id', 'offices.id')
    .select('users.id', 'users.full_name')
    .where('vacancies.id', req.params.vacancy_id)
    .andWhere('offices.owner_id', user_id)
    .andWhere('applications.candidate_applied', true)
    .whereNull('applications.deleted_at')
    .whereNull('offices.deleted_at')
    .whereNull('users.deleted_at')
    .whereNull('vacancies.deleted_at');

  findApplicants()
  .then(applicants => res.send({ applicants }))
  .catch(err => {
    console.error('Error inside getVacancyApplicants.js: ', err);
    res.status(400).end();
  });

};

module.exports = getVacancyApplicants;
