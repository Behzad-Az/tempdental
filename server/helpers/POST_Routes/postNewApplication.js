const postNewApplication = (req, res, knex, user_id, randIdString) => {

  const vacancy_id = req.body.vacancyId.trim();

  const checkIfApplicationAlreadyExists = () => knex('applications')
    .select('candidate_apply_date')
    .where('candidate_id', user_id)
    .andWhere('vacancy_id', vacancy_id)
    .whereNull('deleted_at');

  const updateCandidateApplication = () => knex('applications')
    .where('candidate_id', user_id)
    .andWhere('vacancy_id', vacancy_id)
    .whereNull('deleted_at')
    .update({ candidate_apply_date: knex.fn.now() });

  const insertNewCandidateApplication = newApplicationObj => knex('applications')
    .insert(newApplicationObj);

  checkIfApplicationAlreadyExists()
  .then(application => {
    if (application[0] && application[0].candidate_apply_date) {
      throw 'User has already applied to this position';
    } else if (application[0] && !application[0].candidate_apply_date) {
      return updateCandidateApplication();
    } else {
      return insertNewCandidateApplication({
        id: randIdString(11),
        rand_msg_num: `Y${Math.floor(1000 + Math.random() * 9000)}`,
        candidate_id: user_id,
        vacancy_id,
        candidate_apply_date: knex.fn.now()
      });
    }
  })
  .then(() => res.send(true))
  .catch(err => {
    console.error('Error inside postNewApplication.js: ', err);
    res.status(400).end();
  });

};

module.exports = postNewApplication;
