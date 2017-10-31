import { Map } from 'immutable';

import {
  EMP_DELETE_APPL,
  EMP_GET_APPL_LIST_START,
  EMP_GET_APPL_LIST_ERROR,
  EMP_GET_APPL_LIST_SUCCESS
} from 'actions/EmployerPage/Applications';

const initialState = Map({
  dataLoaded: false,
  pageError: false,
  applications: [],
  asyncLoading: false,
  asyncError: null
});

const actionsMap = {
  [EMP_DELETE_APPL]: (state, action) => {
    let applications = [ ...state.get('applications') ];
    const index = applications.findIndex(appl => appl.id === action.applicationId);
    if (index > -1) { applications.splice(index, 1); }
    return state.merge(Map({ applications }));
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
    console.log("i'm here asdjkashdkajshdkajshdkjashd: ", action.data.applications);
    return state.merge(Map({
      asyncLoading: false,
      asyncError: null,
      pageError: false,
      dataLoaded: true,
      applications: action.data.applications
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
