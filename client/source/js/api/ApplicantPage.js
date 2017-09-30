import promisePolyfill from 'es6-promise';
import 'isomorphic-fetch';

promisePolyfill.polyfill();

function applLoadVacancies(args) {
  const { manualSearch, offsetQuery, startDate, endDate, freshReload } = args;
  const url = manualSearch ?
    `/api/applicant/vacancies-manual?offsetQuery=${offsetQuery}&startDate=${startDate}&endDate=${endDate}&manualSearch=${manualSearch}&lat=${args.searchLat}&lng=${args.searchLng}&searchDistance=${args.searchDistance}&jobTypeArr=${args.jobTypeArr}&freshReload=${freshReload}` :
    `/api/applicant/vacancies-auto?offsetQuery=${args.offsetQuery}&startDate=${startDate}&endDate=${endDate}&manualSearch=${manualSearch}&freshReload=${freshReload}`;

  return fetch(url, {
    method: 'GET',
    credentials: 'same-origin'
  })
  .then(response => response.json())
  .then(resJSON => Object.assign({}, resJSON, { freshReload, manualSearch }));
}

function applGetControlData() {
  return fetch('/api/applicant/controlbar', {
    method: 'GET',
    credentials: 'same-origin'
  })
  .then(response => response.json());
}

export default {
  applLoadVacancies,
  applGetControlData
};
