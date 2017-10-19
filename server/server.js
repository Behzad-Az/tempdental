'use strict';

// ***************************************************
// DEPENDENCIES
// ***************************************************
const express = require('express');
const url = require('url');
const app = express();
const bodyParser = require('body-parser');
// const bcryptjs = require('bcryptjs');
const session = require('express-session');
const connection = require('./db/knexfile.js').development;
const knex = require('knex')(connection);
const fs = require('fs');
const path = require('path');
const randIdString = require('random-base64-string');
// const elasticsearch = require('elasticsearch');
// const esClient = new elasticsearch.Client({
//   host: '127.0.0.1:9200',
//   log: 'error'
// });
// const googleMapsClient = require('@google/maps').createClient({
//   key: 'AIzaSyAf8NX2LPzDPLTwLeHX9IgJ3LuvDQXiiEI'
// });
const twilio = require('twilio');
const twilioClient = new twilio('AC86e391656b6d6a01f9c4b8feff777aa7', 'b683cfcaef2b28189ac58bfe224ef3b7');

// ***************************************************
// NODE MAILER SETUP
// ***************************************************
// const nodemailer = require('nodemailer');
// const mailer = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'no-reply@goalhighway.com',
//     pass: 'ba9876543210'
//   }
// });

const blacklist = [
  '/api/index'
];

// ***************************************************
// MIDDLEWARE
// ***************************************************
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  // SECRET GOES INTO .ENV FILE
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(blacklist, (req, res, next) => {
  if (req.session.user_id) {
    next();
  } else {
    console.error('Error inside server.js - invalid req.session.user_id');
    res.status(403).end();
  }
});
app.use(express.static(path.join(__dirname, '/../../tempdental_docs/public')));

// ***************************************************
// DOCUMENT STORAGE
// ***************************************************
// const resumeUpload = require('./helpers/Upload_Helpers/resumeUpload.js');

// ***************************************************
// PORT
// ***************************************************
const PORT = process.env.PORT || 19001;
const server = app.listen(PORT, '127.0.0.1', 'localhost', () => console.log(`Listening on ${ PORT }`));

// ***************************************************
// HELPERS
// ***************************************************
const getApplicantVacanciesAuto = require('./helpers/GET_Routes/getApplicantVacanciesAuto.js');
const getApplicantVacanciesManual = require('./helpers/GET_Routes/getApplicantVacanciesManual.js');
const getApplicantControlBarInfo = require('./helpers/GET_Routes/getApplicantControlBarInfo.js');
const getEmployerOffices = require('./helpers/GET_Routes/getEmployerOffices.js');
const getEmployerPostings = require('./helpers/GET_Routes/getEmployerPostings.js');
const getVacancyApplicants = require('./helpers/GET_Routes/getVacancyApplicants.js');
const postNewVacancy = require('./helpers/POST_Routes/postNewVacancy.js');
const postNewTextReply = require('./helpers/POST_Routes/postNewTextReply.js');
const postNewApplication = require('./helpers/POST_Routes/postNewApplication.js');

const updateUserNotifSettings = require('./helpers/PUT_Routes/updateUserNotifSettings.js');
const updateVacancy = require('./helpers/PUT_Routes/updateVacancy.js');

const deleteApplication = require('./helpers/DELETE_Routes/deleteApplication.js');
const deleteVacancy = require('./helpers/DELETE_Routes/deleteVacancy.js');


// ***************************************************
// ROUTES - GET
// ***************************************************

app.get('/api/applicant/vacancies-auto', (req, res) => {
  getApplicantVacanciesAuto(req, res, knex, 'bKm2Tzg1z1H');
});

app.get('/api/applicant/vacancies-manual', (req, res) => {
  getApplicantVacanciesManual(req, res, knex, 'bKm2Tzg1z1H');
});

app.get('/api/applicant/controlbar', (req, res) => {
  getApplicantControlBarInfo(req, res, knex, 'bKm2Tzg1z1H');
});

app.get('/api/employer/offices', (req, res) => {
  getEmployerOffices(req, res, knex, 'aWg8Sya0i3V');
});

app.get('/api/employer/vacancies', (req, res) => {
  getEmployerPostings(req, res, knex, 'aWg8Sya0i3V');
});

app.get('/api/employer/vacancies/:vacancyId/applicants', (req, res) => {
  getVacancyApplicants(req, res, knex, 'aWg8Sya0i3V');
});

// // ***************************************************
// // ROUTES - POST
// // ***************************************************
app.post('/api/applicant/applications', (req, res) => {
  postNewApplication(req, res, knex, 'bKm2Tzg1z1H', randIdString);
});

app.post('/api/employer/vacancies', (req, res) => {
  postNewVacancy(req, res, knex, 'aWg8Sya0i3V', randIdString, twilioClient);
});

app.post('/text_replies', (req, res) => {
  postNewTextReply(req, res, knex);
});


// // ***************************************************
// // ROUTES - UPDATE
// // ***************************************************
// app.put('/api/users/:user_id', userPhotoUpload.single('file'), (req, res) => {
//   updateUserProfile(req, res, knex, req.session.user_id, googleMapsClient);
// });
app.put('/api/currentuser/notifsettings', (req, res) => {
  updateUserNotifSettings(req, res, knex, 'bKm2Tzg1z1H');
});

app.put('/api/employer/vacancies/:vacancy_id', (req, res) => {
  updateVacancy(req, res, knex, 'aWg8Sya0i3V');
});


// // ***************************************************
// // ROUTES - DELETE
// // ***************************************************
app.delete('/api/applicant/applications', (req, res) => {
  deleteApplication(req, res, knex, 'bKm2Tzg1z1H');
});

app.delete('/api/employer/vacancies', (req, res) => {
  deleteVacancy(req, res, knex, 'aWg8Sya0i3V');
});
