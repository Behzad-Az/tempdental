import api from 'api/ApplicantPage';

export const APPL_LOAD_VACANCIES_START = 'APPL_LOAD_VACANCIES_START';
export const APPL_LOAD_VACANCIES_ERROR = 'APPL_LOAD_VACANCIES_ERROR';
export const APPL_LOAD_VACANCIES_SUCCESS = 'APPL_LOAD_VACANCIES_SUCCESS';
export const APPL_APPLY = 'APPL_APPLY';
export const APPL_WITHDRAW = 'APPL_WITHDRAW';

export function applApplyOrWithdraw(params) {
  return {
    type: params.action === 'apply' ? APPL_APPLY : APPL_WITHDRAW,
    vacancyId: params.vacancyId
  };
}

function applLoadVacanciesStart(args) {
  return {
    type: APPL_LOAD_VACANCIES_START,
  };
}

function applLoadVacanciesSuccess(data) {
  return {
    type: APPL_LOAD_VACANCIES_SUCCESS,
    data,
  };
}

function applLoadVacanciesError(error) {
  return {
    type: APPL_LOAD_VACANCIES_ERROR,
    error,
  };
}

export function applLoadVacancies(args) {
  return function (dispatch) {
    dispatch(applLoadVacanciesStart());

    api.applLoadVacancies(args)
      .then(data => dispatch(applLoadVacanciesSuccess(data)))
      .catch(error => dispatch(applLoadVacanciesError(error)));
  };
}
