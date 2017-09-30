import { Map } from 'immutable';
import moment from 'moment';

import {
  APPL_GET_CONTROL_DATA_START,
  APPL_GET_CONTROL_DATA_ERROR,
  APPL_GET_CONTROL_DATA_SUCCESS,
  APPL_HANDLE_CONTROL_INPUT_CHNG,
  APPL_HANDLE_CONTROL_CHECKBOX,
  APPL_HANDLE_ADDRESS_SEARCH,
  APPL_TOGGLE_MODAL
} from 'actions/ApplicantPage/ControlBar';

const initialState = Map({
  dataLoaded: false,
  pageError: false,
  userInfo: {},
  searchLat: null,
  searchLng: null,
  searchAddress: '',
  searchDistance: null,
  searchFT: true,
  searchPT: true,
  searchTemp: true,
  startDate: moment().format('YYYY-MM-DD'),
  endDate: moment().add(6, 'months').format('YYYY-MM-DD'),
  modals: {
    notifModal: false,
    resumeModal: false,
    withdrawAllModal: false
  }
});

const actionsMap = {
  [APPL_TOGGLE_MODAL]: (state, action) => {
    const { modalName } = action;
    let modals = { ...state.get('modals') };
    modals[modalName] = !state.get('modals')[modalName];
    return state.merge(Map({ modals }));
  },

  [APPL_HANDLE_CONTROL_INPUT_CHNG]: (state, action) => {
    let { name, value } = action.event.target;
    if (name === 'searchDistance') { value = parseInt(value); }
    let stateObj = {};
    stateObj[name] = value;
    return state.merge(Map(stateObj));
  },

  [APPL_HANDLE_CONTROL_CHECKBOX]: (state, action) => {
    let { name, checked } = action.event.target;
    let stateObj = {};
    stateObj[name] = checked;
    return state.merge(Map(stateObj));
  },

  [APPL_HANDLE_ADDRESS_SEARCH]: (state, action) => {
    return state.merge(Map(action.addressObj));
  },

  [APPL_GET_CONTROL_DATA_START]: (state, action) => {
    return state.merge(Map({
      asyncLoading: true,
      asyncError: null
    }));
  },

  [APPL_GET_CONTROL_DATA_ERROR]: (state, action) => {
    return state.merge(Map({
      asyncLoading: false,
      asyncError: action.error,
      pageError: true,
      dataLoaded: true
    }));
  },

  [APPL_GET_CONTROL_DATA_SUCCESS]: (state, action) => {
    return state.merge(Map({
      asyncLoading: false,
      asyncError: null,
      pageError: false,
      dataLoaded: true,
      searchLat: action.data.userInfo.lat,
      searchLng: action.data.userInfo.lng,
      searchAddress: action.data.userInfo.address,
      searchDistance: action.data.userInfo.search_distance,
      userInfo: action.data.userInfo
    }));
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
