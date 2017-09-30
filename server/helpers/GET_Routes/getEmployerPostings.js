const getEmployerPostings = (req, res, knex, user_id) => {

  let { statusCodes, types } = req.query;
  let postings;

  if (statusCodes === 'all' || !statusCodes) {
    statusCodes = ['filled', 'withdrawn', 'expired'];
  } else {
    statusCodes = statusCodes.split(',');
  }

  if (types === 'all' || !types) {
    types = ['FT', 'PT', 'Temp'];
  } else {
    types = types.split(',');
  }

  const getPostings = () => knex('vacancies')
    .leftJoin('offices', 'vacancies.office_id', 'offices.id')
    .select(
      'vacancies.id', 'vacancies.title', 'vacancies.description', 'vacancies.type', 'vacancies.created_at', 'vacancies.office_id',
      'offices.lat', 'offices.lng', 'offices.address', 'offices.name as officeName', 'offices.more_info as officeInfo'
    )
    .where('offices.owner_id', user_id)
    .whereNull('vacancies.deleted_at')
    .whereNull('offices.deleted_at');

  const getDatesForPostings = postingIds => knex('vacancy_dates')
    .select('vacancy_id', 'start_date', 'end_date')
    .whereIn('vacancy_id', postingIds)
    .whereNull('deleted_at');


  getPostings()
  .then(foundPostings => {
    postings = foundPostings;
    return getDatesForPostings(foundPostings.map(posting => posting.id));
  })
  .then(vacancyDates => res.send({ postings, vacancyDates }))
  .catch(err => {
    console.error('Error inside getEmployerPostings.js: ', err);
    res.status(400).end();
  });

};

module.exports = getEmployerPostings;
