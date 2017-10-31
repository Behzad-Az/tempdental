const deleteEmpApplication = (req, res, knex, user_id) => {

  const { id } = req.params;
  const { vacancy_id, candidate_id } = req.query;

  const deleteApplication = () => knex('applications')
    .where({ id, vacancy_id, candidate_id })
    .andWhere('employer_viewed', true)
    // .whereNull('deleted_at')
    .update({ employer_deleted: true });

  deleteApplication()
  .then(() => res.send(true))
  .catch(err => {
    console.error('Error inside deleteApplApplication.js: ', err);
    res.status(400).end();
  });

};

module.exports = deleteEmpApplication;
