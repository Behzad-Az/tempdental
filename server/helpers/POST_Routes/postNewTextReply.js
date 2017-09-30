const postNewTextReply = (req, res, knex) => {

  const replyText = req.body.Body.trim().toUpperCase();

  const validateReplyText = () => new Promise((resolve, reject) => {
    replyText.match(/[YN][0-9]{4}/) ? resolve() : reject('Invalid reply text');
  });

  const findUserId = () => knex('users')
    .select('id')
    .where('phone_number', req.body.From)
    .whereNull('deleted_at')
    .limit(1);

  const updateCandidateApplication = candidateId => knex('applications')
    .where('candidate_id', candidateId)
    .andWhere('rand_msg_num', replyText.replace(/N/g, 'Y'))
    .whereNull('deleted_at')
    .update({ candidate_applied: replyText[0] === 'Y' })
    .returning('vacancy_id');

  const getVacancyInfo = vacancyId => knex('vacancies')
    .leftJoin('offices', 'vacancies.office_id', 'offices.id')
    .select('vacancies.title', 'offices.name as officeName')
    .where('vacancies.id', vacancyId)
    .whereNull('vacancies.deleted_at')
    .whereNull('offices.deleted_at')
    .limit(1);

  validateReplyText()
  .then(() => findUserId())
  .then(candidateId => updateCandidateApplication(candidateId[0].id))
  .then(vacancyId => {
    if (vacancyId[0]) {
      return getVacancyInfo(vacancyId[0]);
    } else {
      throw 'Invalid rand_msg_num';
    }
  })
  .then(vacancy => {
    if (replyText[0] === 'Y') {
      res.send(`
        <Response>
          <Message>
            Thanks. You have successfully applied to "${vacancy[0].title}" at "${vacancy[0].officeName}".
          </Message>
        </Response>
      `);
    } else {
      res.send(`
        <Response>
          <Message>
            You have withdrawn your application for "${vacancy[0].title}" at "${vacancy[0].officeName}".
          </Message>
        </Response>
      `);
    }
  })
  .catch(err => {
    console.error('Error inside postNewTextReply.js: ', err);
    res.send(`
      <Response>
        <Message>
          Sorry. We could not process your application at the moment.
        </Message>
      </Response>
    `)
  });

};

module.exports = postNewTextReply;
