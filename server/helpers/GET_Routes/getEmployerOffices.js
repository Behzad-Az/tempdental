const getEmployerOffices = (req, res, knex, user_id) => {

  const getOfficeList = () => knex('offices')
    .select('id', 'name', 'more_info', 'address', 'lat', 'lng', 'created_at')
    .where('owner_id', user_id)
    .whereNull('deleted_at');

  getOfficeList()
  .then(offices => res.send({ offices }))
  .catch(err => {
    console.error('Error inside getEmployerOffices.js: ', err);
    res.status(400).end();
  });

};

module.exports = getEmployerOffices;
