const getVacancyApplicants = (req, res, knex, user_id) => {

  const { vacancyId } = req.params;

  const findApplicants = () => knex('users')
    .leftJoin('applications', 'users.id', 'applications.candidate_id')
    .leftJoin('vacancies', 'applications.vacancy_id', 'vacancies.id')
    .leftJoin('offices', 'vacancies.office_id', 'offices.id')
    .select('users.id', 'users.full_name')
    .where('vacancies.id', vacancyId)
    .andWhere('offices.owner_id', user_id)
    .andWhere('applications.candidate_applied', true)
    .whereNull('applications.deleted_at')
    .whereNull('offices.deleted_at')
    .whereNull('users.deleted_at')
    .whereNull('vacancies.deleted_at');

  findApplicants()
  .then(console.log)
  .catch(console.error);

};

module.exports = getVacancyApplicants;
