const postNewVacancy = (req, res, knex, user_id, randIdString, twilioClient) => {

  const office_id = req.body.officeId.trim();
  const type = req.body.type.trim();
  const title = req.body.title.trim();
  const description = req.body.description.trim();
  const anonymous = req.body.anonymous;
  const start_date = req.body.startDate;
  const end_date = type === 'Temp' ? req.body.endDate : null;
  let officeGisLocation, officeAddress, officeName, nearByUsers, vacancy_id;

  const verifyOfficeOwner = () => knex('offices')
    .select('geog_gis_loc', 'name', 'address')
    .where({ id: office_id, owner_id: user_id })
    .whereNull('deleted_at')
    .limit(1);

  const insertNewVacancy = (newVacancyObj) => knex('vacancies')
    .insert(newVacancyObj)
    .returning('id');

  const findNearbyUsers = gisLocation => knex('users')
    .select('full_name', 'phone_number', 'id')
    .whereRaw(`ST_DWithin (users.geog_gis_loc, '${gisLocation}', 50000)`)
    .whereNull('deleted_at');

  const insertCandidateProfiles = (candidateArr) => knex('applications')
    .insert(candidateArr)
    .returning(['candidate_id', 'rand_msg_num']);

  const textNotify = msgObj => twilioClient.messages.create(msgObj);

  verifyOfficeOwner()
  .then(foundOffice => {
    if (foundOffice[0]) {
      officeGisLocation = foundOffice[0].geog_gis_loc;
      officeAddress = foundOffice[0].address;
      officeName = foundOffice[0].name;
      return insertNewVacancy({
        id: randIdString(11),
        type,
        title,
        description,
        anonymous,
        start_date,
        end_date,
        office_id
      });
    } else {
      throw 'office_id and owner_id do not match';
    }
  })
  .then(newVacancyId => {
    vacancy_id = newVacancyId[0];
    return findNearbyUsers(officeGisLocation);
  })
  .then(foundUsers => {
    nearByUsers = foundUsers;
    return insertCandidateProfiles(nearByUsers.map(user => {
      return {
        id: randIdString(11),
        rand_msg_num: `Y${Math.floor(1000 + Math.random() * 9000)}`,
        candidate_id: user.id,
        vacancy_id
      };
    }));
  })
  .then(candidateProfiles => {
    res.send(true);
    // const candidateArr = candidateProfiles.map(candidate => {
    //   const { full_name, phone_number } = nearByUsers.find(user => user.id === candidate.candidate_id);
    //   return textNotify({
    //     body: `SUP SUP SUP, ${full_name}... We gots a job for yo ass.
    //           \n${title}
    //           \n${description}
    //           \nfrom ${start_date} to ${end_date}
    //           \nat ${officeName}
    //           \n${officeAddress}
    //           \nText ${candidate.rand_msg_num} to apply.`,
    //     to: phone_number,
    //     from: '+16042297787'
    //   });
    // });
    // return Promise.all(candidateArr);
  })
  .catch(err => {
    console.error('Error inside postNewVacancy.js: ', err);
    res.status(400).end();
  });

  // knex.transaction(trx => {
  //   verifyOfficeOwner()
  //   .then(foundOffice => {
  //     if (foundOffice[0]) {
  //       officeGisLocation = foundOffice[0].geog_gis_loc;
  //       officeAddress = foundOffice[0].address;
  //       officeName = foundOffice[0].name;
  //       const newVacancyObj = {
  //         id: randIdString(11),
  //         start_date,
  //         end_date,
  //         title,
  //         description,
  //         office_id
  //       };
  //       return insertNewVacancy(newVacancyObj, trx);
  //     } else {
  //       throw 'office_id and owner_id do not match';
  //     }
  //   })
  //   .then(newVacancyId => {
  //     vacancy_id = newVacancyId[0];
  //     return findNearbyUsers(officeGisLocation);
  //   })
  //   .then(foundUsers => {
  //     nearByUsers = foundUsers;
  //     return insertCandidateProfiles(nearByUsers.map(user => {
  //       return {
  //         id: randIdString(11),
  //         rand_msg_num: `Y${Math.floor(1000 + Math.random() * 9000)}`,
  //         candidate_phone_number: user.phone_number,
  //         candidate_id: user.id,
  //         vacancy_id
  //       };
  //     }));
  //   })
  //   .then(candidateProfiles => {
  //     trx.commit();
  //     return Promise.all(candidateProfiles.map(candidate => textNotify({
  //       body: `SUP SUP SUP, ${nearByUsers.find(user => user.phone_number === candidate.candidate_phone_number).full_name}... We gots a job for yo ass.
  //             \n${title}
  //             \n${description}
  //             \nfrom ${start_date} to ${end_date}
  //             \nat ${officeName}
  //             \n${officeAddress}
  //             \nText ${candidate.rand_msg_num} to apply.`,
  //       to: candidate.candidate_phone_number,
  //       from: '+16042297787'
  //     })));
  //   })
  //   // .then(() => trx.commit())
  //   .catch(err => {
  //     console.error('Error inside postNewVacancy.js - inside transaction: ', err);
  //     trx.rollback();
  //   });
  // })
  // .then(() => res.send(true))
  // .catch(err => {
  //   console.error('Error inside postNewVacancy.js - outside transaction: ', err);
  //   res.status(400).end();
  // });
  // // .then(() => res.send(true))
  // // .catch(() => res.send(false));

};

module.exports = postNewVacancy;
