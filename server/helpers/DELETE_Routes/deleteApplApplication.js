const deleteApplApplication = (req, res, knex, user_id) => {

  const { vacancy_id } = req.params;

  const withdrawApplication = () => knex('applications')
    .where('candidate_id', user_id)
    .andWhere('vacancy_id', vacancy_id)
    .whereNotNull('candidate_apply_date')
    .whereNull('deleted_at')
    .update({ candidate_apply_date: null });

  const withdrawAllApplications = () => knex('applications')
    .where('candidate_id', user_id)
    .whereNotNull('candidate_apply_date')
    .whereNull('deleted_at')
    .update({ candidate_apply_date: null });

  const determineFcn = () => vacancy_id === '_all' ? withdrawAllApplications() : withdrawApplication();

  determineFcn()
  .then(() => res.send(true))
  .catch(err => {
    console.error('Error inside deleteApplApplication.js: ', err);
    res.status(400).end();
  });

};

module.exports = deleteApplApplication;
