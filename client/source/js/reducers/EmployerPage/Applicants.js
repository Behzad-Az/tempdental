import { Map } from 'immutable';

import {
  EMP_DELETE_APPL,
  EMP_GET_APPL_LIST_START,
  EMP_GET_APPL_LIST_ERROR,
  EMP_GET_APPL_LIST_SUCCESS
} from 'actions/EmployerPage/Applicants';

const initialState = Map({
  dataLoaded: false,
  pageError: false,
  applicants: [],
  asyncLoading: false,
  asyncError: null
});

const actionsMap = {
  [EMP_DELETE_APPL]: (state, action) => {
    let applicants = [ ...state.get('applicants') ];
    const index = applicants.indexOf(appl => appl.id === action.applicationId);
    // applicants.splice(index, 1);
    return state.merge(Map({ applicants }));
  },

  [EMP_GET_APPL_LIST_START]: (state, action) => {
    return state.merge(Map({
      asyncLoading: true,
      asyncError: null
    }));
  },
  [EMP_GET_APPL_LIST_ERROR]: (state, action) => {
    return state.merge(Map({
      asyncLoading: false,
      asyncError: action.error,
      pageError: true,
      dataLoaded: true
    }));
  },
  [EMP_GET_APPL_LIST_SUCCESS]: (state, action) => {
    return state.merge(Map({
      asyncLoading: false,
      asyncError: null,
      pageError: false,
      dataLoaded: true,
      applicants: action.data.applicants
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
