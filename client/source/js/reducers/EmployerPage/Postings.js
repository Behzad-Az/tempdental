import { Map } from 'immutable';

import {
  EMP_GET_POSTINGS_START,
  EMP_GET_POSTINGS_ERROR,
  EMP_GET_POSTINGS_SUCCESS,
  EMP_DELETE_POSTING,
  EMP_DECREMENT_POSTING_APPL_COUNT,
  EMP_POSTING_APPL_VIEWED
} from 'actions/EmployerPage/Postings';

const initialState = Map({
  dataLoaded: false,
  pageError: false,
  postings: [],
  applCounts: [],
  asyncLoading: false,
  asyncError: null
});

const actionsMap = {
  [EMP_DELETE_POSTING]: (state, action) => {
    const { vacancyId } = action;
    return state.merge(Map({
      postings: vacancyId === '_all' ? [] : state.get('postings').filter(posting => posting.id !== vacancyId)
    }));
  },

  [EMP_DECREMENT_POSTING_APPL_COUNT]: (state, action) => {
    return state.merge(Map({
      applCounts: state.get('applCounts').filter(appl => appl.id !== action.applId)
    }));
  },

  [EMP_POSTING_APPL_VIEWED]: (state, action) => {
    const applCounts = state.get('applCounts').map(appl => {
      if (appl.vacancy_id === action.vacancyId) {
        appl.employer_viewed = true;
      }
      return appl;
    });
    return state.merge(Map({ applCounts }));
  },

  [EMP_GET_POSTINGS_START]: (state, action) => {
    return state.merge(Map({
      asyncLoading: true,
      asyncError: null
    }));
  },
  [EMP_GET_POSTINGS_ERROR]: (state, action) => {
    return state.merge(Map({
      asyncLoading: false,
      asyncError: action.error,
      pageError: true,
      dataLoaded: true
    }));
  },
  [EMP_GET_POSTINGS_SUCCESS]: (state, action) => {
    const { postings, applCounts } = action.data;
    return state.merge(Map({
      asyncLoading: false,
      asyncError: null,
      pageError: false,
      dataLoaded: true,
      postings,
      applCounts
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
