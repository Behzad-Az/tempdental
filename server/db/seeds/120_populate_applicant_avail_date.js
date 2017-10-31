const fs = require('fs');
const applicantAvailDatesRaw = fs.readFileSync(__dirname + '/seeded_applicant_avail_dates.json');
const applicantAvailDatesArr = JSON.parse(applicantAvailDatesRaw);

exports.seed = function(knex, Promise) {
  // return Promise.all(applicantAvailDatesArr.map(date => knex('applicant_avail_dates').insert(date)));
  return Promise.all([]);
};
