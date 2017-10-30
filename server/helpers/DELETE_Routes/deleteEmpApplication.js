const deleteEmpApplication = (req, res, knex, user_id) => {

  const { id } = req.params;
  const { vacancy_id, candidate_id } = req.query;

  const deleteApplication = () => knex('applications')
    .where({ id, vacancy_id, candidate_id })
    .whereNull('deleted_at')
    .update({ employer_deleted: true })
    .returning('id');


  deleteApplication()
  .then(id => res.send(true))
  .catch(err => {
    console.error('Error inside deleteApplApplication.js: ', err);
    res.status(400).end();
  });

};

module.exports = deleteEmpApplication;
