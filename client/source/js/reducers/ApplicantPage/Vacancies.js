import { Map } from 'immutable';

import {
  APPL_LOAD_VACANCIES_START,
  APPL_LOAD_VACANCIES_ERROR,
  APPL_LOAD_VACANCIES_SUCCESS,
  APPL_APPLY,
  APPL_WITHDRAW
} from 'actions/ApplicantPage/Vacancies';

const initialState = Map({
  dataLoaded: false,
  pageError: false,
  userApplications: [],
  vacancies: [],
  vacancyDates: [],
  noMoreVacancies: false,
  manualSearch: false,
  asyncLoading: false,
  asyncError: null
});

const actionsMap = {

  [APPL_APPLY]: (state, action) => {
    return state.merge(Map({
      userApplications: state.get('userApplications').concat(action.vacancyId)
    }));;
  },

  [APPL_WITHDRAW]: (state, action) => {
    if (action.vacancyId === '_all') {
      return state.merge(Map({
        userApplications: []
      }));
    } else {
      let userApplications = [...state.get('userApplications')];
      const index = userApplications.indexOf(action.vacancyId);
      if (index > -1) { userApplications.splice(index, 1); }
      return state.merge(Map({
        userApplications
      }));
    }
  },

  [APPL_LOAD_VACANCIES_START]: (state, action) => {
    return state.merge(Map({
      asyncLoading: true,
      asyncError: null
    }));
  },
  [APPL_LOAD_VACANCIES_ERROR]: (state, action) => {
    return state.merge(Map({
      asyncLoading: false,
      asyncError: action.error,
      pageError: true,
      dataLoaded: true
    }));
  },
  [APPL_LOAD_VACANCIES_SUCCESS]: (state, action) => {
    if (action.data.freshReload) {
      return state.merge(Map({
        asyncLoading: false,
        asyncError: null,
        pageError: false,
        dataLoaded: true,
        userApplications: action.data.userApplications.map(application => application.vacancy_id),
        vacancies: action.data.vacancies,
        vacancyDates: action.data.vacancyDates,
        noMoreVacancies: !action.data.vacancies.length,
        manualSearch: action.data.manualSearch
      }));
    } else {
      return state.merge(Map({
        asyncLoading: false,
        asyncError: null,
        pageError: false,
        dataLoaded: true,
        userApplications: action.data.userApplications.map(application => application.vacancy_id),
        vacancies: state.get('vacancies').concat(action.data.vacancies),
        vacancyDates: state.get('vacancyDates').concat(action.data.vacancyDates),
        noMoreVacancies: !action.data.vacancies.length,
        manualSearch: action.data.manualSearch
      }));
    }
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
