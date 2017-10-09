const getApplicantVacanciesManual = (req, res, knex, user_id) => {

  const manualSearch = req.query.manualSearch === 'true';
  const { startDate, endDate, offsetQuery, lat, lng, searchDistance } = req.query;

  const jobTypeArr = req.query.jobTypeArr.split(',');
  let vacancies, userApplications;

  const getDatesForVacancies = vacancyIds => knex('vacancy_dates')
    .select('vacancy_id', 'start_date', 'end_date')
    .whereIn('vacancy_id', vacancyIds)
    .whereNull('deleted_at');

  const getRelevantVacanciesManualSearch = () => knex('vacancies')
    .leftJoin('offices', 'vacancies.office_id', 'offices.id')
    .select(
      'vacancies.id', 'vacancies.title', 'vacancies.description', 'vacancies.type', 'vacancies.created_at',
      'offices.lat', 'offices.lng', 'offices.address', 'offices.name as officeName', 'offices.more_info as officeInfo'
    )
    .whereRaw(`ST_DWithin (offices.geog_gis_loc, ST_GeographyFromText('SRID=4326; POINT(${lng} ${lat})'), ${searchDistance})`)
    .whereIn('vacancies.type', jobTypeArr)
    .whereNull('vacancies.deleted_at')
    .whereNull('offices.deleted_at')
    .orderByRaw(`ST_Distance (offices.geog_gis_loc, ST_GeographyFromText('SRID=4326; POINT(${lng} ${lat})'))`)
    .orderBy('vacancies.created_at')
    .limit(3)
    .offset(offsetQuery);

  const getUserApplications = () => knex('applications')
    .select('vacancy_id')
    .where('candidate_id', user_id)
    .andWhere('candidate_applied', true)
    .whereNull('deleted_at');

  Promise.all([getRelevantVacanciesManualSearch(), getUserApplications()])
  .then(results => {
    vacancies = results[0];
    userApplications = results[1];
    return getDatesForVacancies(vacancies.map(vacancy => vacancy.id));
  })
  .then(vacancyDates => res.send({ vacancies, userApplications, vacancyDates }))
  .catch(err => {
    console.error('Error inside getApplicantVacanciesManual.js: ', err);
    res.status(400).end();
  });

};

module.exports = getApplicantVacanciesManual;
