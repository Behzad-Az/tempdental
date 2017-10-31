import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';

promisePolyfill.polyfill();

function empGetControlData() {
  return fetch('/api/employer/offices', {
    method: 'GET',
    credentials: 'same-origin'
  })
  .then(response => response.json());
}

function empGetPostings() {
  return fetch('/api/employer/vacancies', {
    method: 'GET',
    credentials: 'same-origin'
  })
  .then(response => response.json());
}

function empGetApplList(vacancyId) {
  return fetch(`/api/employer/vacancies/${vacancyId}/applications`, {
    method: 'GET',
    credentials: 'same-origin'
  })
  .then(response => response.json());
}

export default {
  empGetControlData,
  empGetPostings,
  empGetApplList
};
