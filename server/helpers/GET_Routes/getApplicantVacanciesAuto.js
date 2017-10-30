const getApplicantVacanciesAuto = (req, res, knex, user_id) => {

  const manualSearch = req.query.manualSearch === 'true';
  const { startDate, endDate, offsetQuery } = req.query;

  const getUserInfo = () => knex('users')
    .select('geog_gis_loc', 'search_distance', 'search_pt', 'search_ft', 'search_temp')
    .where('id', user_id)
    .whereNull('deleted_at')
    .limit(1);

  const getVacanciesAuto = userInfo => knex('vacancies')
    .leftJoin('offices', 'vacancies.office_id', 'offices.id')
    .select(
      'vacancies.id', 'vacancies.title', 'vacancies.description', 'vacancies.type',
      'vacancies.created_at', 'vacancies.anonymous', 'vacancies.start_date', 'vacancies.end_date',
      'offices.lat', 'offices.lng', 'offices.address', 'offices.name as officeName', 'offices.more_info as officeInfo'
    )
    .whereRaw(`ST_DWithin (offices.geog_gis_loc, '${userInfo.geog_gis_loc}', ${userInfo.search_distance})`)
    .whereIn('vacancies.type', userInfo.vacancyTypes)
    .whereNull('vacancies.deleted_at')
    .whereNull('offices.deleted_at')
    .orderByRaw(`ST_Distance (offices.geog_gis_loc, '${userInfo.geog_gis_loc}')`)
    .orderBy('vacancies.created_at')
    .limit(3)
    .offset(offsetQuery);

  const getUserApplications = () => knex('applications')
    .select('vacancy_id')
    .where('candidate_id', user_id)
    .whereNotNull('candidate_apply_date')
    .whereNull('deleted_at');

  getUserInfo()
  .then(foundUser => {
    let userInfo = foundUser[0];
    userInfo.vacancyTypes = [
      userInfo.search_ft ? 'FT' : null,
      userInfo.search_pt ? 'PT' : null,
      userInfo.search_temp ? 'Temp' : null
    ];
    return Promise.all([ getVacanciesAuto(userInfo), getUserApplications() ])
  })
  .then(results => res.send({ vacancies: results[0], userApplications: results[1] }))
  .catch(err => {
    console.error('Error inside getApplicantVacanciesAuto.js: ', err);
    res.status(400).end();
  });

};

module.exports = getApplicantVacanciesAuto;
