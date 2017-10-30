const getApplicantControlBarInfo = (req, res, knex, user_id) => {

  const getUserInfo = () => knex('users')
    .select(
      'lat', 'lng', 'address', 'full_name', 'prefix', 'search_distance',
      'search_pt', 'search_ft', 'search_temp', 'get_notified'
    )
    .where('id', user_id)
    .whereNull('deleted_at')
    .limit(1);

  getUserInfo()
  .then(userInfo => res.send({ userInfo: userInfo[0] }))
  .catch(err => {
    console.error('Error inside getApplicantControlBarInfo.js: ', err);
    res.status(400).end();
  });

};

module.exports = getApplicantControlBarInfo;
