const getApplicantControlBarInfo = (req, res, knex, user_id) => {

  const getUserInfo = () => knex('users')
    .select('lat', 'lng', 'address', 'full_name', 'prefix', 'search_distance')
    .where('id', user_id)
    .whereNull('deleted_at')
    .limit(1);

  // const getUserApplications = () => knex('applications')
  //   .leftJoin('vacancies', 'applications.vacancy_id', 'vacancies.id')
  //   .leftJoin('offices', 'vacancies.office_id', 'offices.id')
  //   .select('vacancies.id as vacancyId', 'vacancies.title', 'vacancies.start_date', 'vacancies.end_date', 'offices.name as officeName')
  //   .where('applications.candidate_id', user_id)
  //   .andWhere('applications.candidate_applied', true)
  //   .whereNull('applications.deleted_at')
  //   .whereNull('vacancies.deleted_at')
  //   .whereNull('offices.deleted_at');

  // Promise.all([ getUserInfo(), getUserApplications() ])
  getUserInfo()
  .then(userInfo => res.send({ userInfo: userInfo[0] }))
  .catch(err => {
    console.error('Error inside getApplicantControlBarInfo.js: ', err);
    res.status(400).end();
  });

};

module.exports = getApplicantControlBarInfo;
