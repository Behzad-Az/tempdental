const updateUserSearchCriteria = (req, res, knex, user_id) => {

  const { lat, lng, address, search_distance } = req.body;

  knex.raw(`update users set geog_gis_loc=ST_GeographyFromText('SRID=4326; POINT(${lng} ${lat})'), lat=${lat}, lng=${lng}, address='${address}', search_distance=${search_distance} where id='${user_id}'`)
  .then(() => res.send(true))
  .catch(err => {
    console.error('Error inside updateUserSearchCriteria.js: ', err);
    res.status(400).end();
  });

};

module.exports = updateUserSearchCriteria;
