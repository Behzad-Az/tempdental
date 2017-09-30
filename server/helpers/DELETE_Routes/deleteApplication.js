const deleteApplication = (req, res, knex, user_id) => {

  let { vacancyId } = req.query;

  const withdrawApplication = () => knex('applications')
    .where('candidate_id', user_id)
    .andWhere('vacancy_id', vacancyId)
    .andWhere('candidate_applied', true)
    .whereNull('deleted_at')
    .update({ candidate_applied: false });

  const withdrawAllApplications = () => knex('applications')
    .where('candidate_id', user_id)
    .andWhere('candidate_applied', true)
    .whereNull('deleted_at')
    .update({ candidate_applied: false });

  const determineFcn = () => vacancyId === 'all' ? withdrawAllApplications() : withdrawApplication();

  determineFcn()
  .then(() => res.send(true))
  .catch(err => {
    console.error('Error inside deleteApplication.js: ', err);
    res.status(400).end();
  });

};

module.exports = deleteApplication;
