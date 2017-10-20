const getEmployerPostings = (req, res, knex, user_id) => {

  let { statusCodes, types } = req.query;
  let postings;

  if (statusCodes === '_all' || !statusCodes) {
    statusCodes = ['filled', 'withdrawn', 'expired'];
  } else {
    statusCodes = statusCodes.split(',');
  }

  if (types === '_all' || !types) {
    types = ['FT', 'PT', 'Temp'];
  } else {
    types = types.split(',');
  }

  const getPostings = () => knex('vacancies')
    .leftJoin('offices', 'vacancies.office_id', 'offices.id')
    .select(
      'vacancies.id', 'vacancies.title', 'vacancies.description', 'vacancies.type', 'vacancies.created_at',
      'vacancies.office_id', 'vacancies.anonymous', 'vacancies.start_date', 'vacancies.end_date',
      'offices.lat', 'offices.lng', 'offices.address', 'offices.name as officeName', 'offices.more_info as officeInfo'
    )
    .where('offices.owner_id', user_id)
    .whereNull('vacancies.deleted_at')
    .whereNull('offices.deleted_at')
    .orderBy('vacancies.created_at');

  const getPostingApplicantCounts = postingIds => knex('applications')
    .select('vacancy_id')
    .count('id')
    .where('candidate_applied', true)
    .andWhere('employer_deleted', false)
    .whereNull('deleted_at')
    .groupBy('vacancy_id');

  getPostings()
  .then(foundPostings => {
    postings = foundPostings;
    return getPostingApplicantCounts(postings.map(posting => posting.id));
  })
  .then(applicantCounts => res.send({ postings, applicantCounts }))
  .catch(err => {
    console.error('Error inside getEmployerPostings.js: ', err);
    res.status(400).end();
  });

};

module.exports = getEmployerPostings;
