const getApplicantVacanciesManual = (req, res, knex, user_id) => {

  const manualSearch = req.query.manualSearch === 'true';
  const { startDate, endDate, offsetQuery, lat, lng, searchDistance } = req.query;

  const jobTypeArr = req.query.jobTypeArr.split(',');

  const getVacanciesManual = () => knex('vacancies')
    .leftJoin('offices', 'vacancies.office_id', 'offices.id')
    .select(
      'vacancies.id', 'vacancies.title', 'vacancies.description', 'vacancies.type',
      'vacancies.created_at', 'vacancies.anonymous', 'vacancies.start_date', 'vacancies.end_date',
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

  Promise.all([ getVacanciesManual(), getUserApplications() ])
  .then(results => res.send({ vacancies: results[0], userApplications: results[1] }))
  .catch(err => {
    console.error('Error inside getApplicantVacanciesManual.js: ', err);
    res.status(400).end();
  });

};

module.exports = getApplicantVacanciesManual;
