import { Map } from 'immutable';

import {
  EMP_GET_CONTROL_DATA_START,
  EMP_GET_CONTROL_DATA_ERROR,
  EMP_GET_CONTROL_DATA_SUCCESS,
  EMP_FILTER_OFFICES,
  EMP_TOGGLE_MODAL
} from 'actions/EmployerPage/ControlBar';

const initialState = Map({
  dataLoaded: false,
  pageError: false,
  offices: [],
  selectedOffices: [],
  showOfficeModal: false,
  editedOfficeId: null,
  asyncLoading: false,
  asyncError: null
});

const actionsMap = {
  [EMP_FILTER_OFFICES]: (state, action) => {
    const { officeId } = action;
    let selectedOffices = [...state.get('selectedOffices')];
    const index = selectedOffices.indexOf(officeId);
    index > -1 ? selectedOffices.splice(index, 1) : selectedOffices.push(officeId);
    return state.merge(Map({ selectedOffices }));
  },

  [EMP_TOGGLE_MODAL]: (state, action) => {
    let stateObj = {};
    const { modalName, editedOfficeId } = action.args;
    stateObj[modalName] = !state.get(modalName);
    stateObj.editedOfficeId = editedOfficeId;
    return state.merge(Map(stateObj));
  },

  [EMP_GET_CONTROL_DATA_START]: (state, action) => {
    return state.merge(Map({
      asyncLoading: true,
      asyncError: null
    }));
  },

  [EMP_GET_CONTROL_DATA_ERROR]: (state, action) => {
    return state.merge(Map({
      asyncLoading: false,
      asyncError: action.error,
      pageError: true,
      dataLoaded: true
    }));
  },

  [EMP_GET_CONTROL_DATA_SUCCESS]: (state, action) => {
    return state.merge(Map({
      asyncLoading: false,
      asyncError: null,
      pageError: false,
      dataLoaded: true,
      offices: action.data.offices,
      selectedOffices: []
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
