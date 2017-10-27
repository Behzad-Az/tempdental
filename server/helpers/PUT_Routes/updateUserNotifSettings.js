const updateUserNotifSettings = (req, res, knex, user_id) => {

  const { lat, lng } = req.body;
  const address = req.body.address.trim();
  const search_distance = req.body.searchDistance;
  const search_ft = req.body.searchFt;
  const search_pt = req.body.searchPt;
  const search_temp = req.body.searchTemp;
  const get_notified = req.body.getNotified;

  console.log("i'm here 6: ", {get_notified});

  knex.raw(`update users set
    geog_gis_loc=ST_GeographyFromText('SRID=4326; POINT(${lng} ${lat})'),
    lat=${lat},
    lng=${lng},
    address='${address}',
    search_distance=${search_distance},
    search_ft=${search_ft},
    search_pt=${search_pt},
    search_temp=${search_temp},
    get_notified=${get_notified}
    where id='${user_id}'`)
  .then(() => res.send(true))
  .catch(err => {
    console.error('Error inside updateUserNotifSettings.js: ', err);
    res.status(400).end();
  });


};

module.exports = updateUserNotifSettings;
