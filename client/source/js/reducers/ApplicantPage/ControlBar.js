import { Map } from 'immutable';
import moment from 'moment';

import {
  APPL_GET_CONTROL_DATA_START,
  APPL_GET_CONTROL_DATA_ERROR,
  APPL_GET_CONTROL_DATA_SUCCESS,
  APPL_HANDLE_CONTROL_INPUT_CHNG,
  APPL_HANDLE_CONTROL_CHECKBOX,
  APPL_HANDLE_ADDRESS_SEARCH,
  APPL_TOGGLE_MODAL,
  APPL_MODAL_HANDLE_CHNG
} from 'actions/ApplicantPage/ControlBar';

const initialState = Map({
  dataLoaded: false,
  pageError: false,
  userInfo: {},
  searchLat: null,
  searchLng: null,
  searchAddress: '',
  searchDistance: null,
  searchFt: null,
  searchPt: null,
  searchTemp: null,
  getNotified: null,
  startDate: moment().format('YYYY-MM-DD'),
  endDate: moment().add(6, 'months').format('YYYY-MM-DD'),
  modals: {
    notifModal: false,
    resumeModal: false,
    withdrawAllModal: false
  },
  modalValues: {}
});

const actionsMap = {
  [APPL_TOGGLE_MODAL]: (state, action) => {
    const { modalValues } = action;
    let modals = { ...state.get('modals') };
    modals[modalValues.modalName] = !state.get('modals')[modalValues.modalName];
    return state.merge(Map({ modals, modalValues }));
  },

  [APPL_MODAL_HANDLE_CHNG]: (state, action) => {
    const { name, value, checked } = action.event.target;
    let modalValues = { ...state.get('modalValues') };
    switch (name) {
      case 'searchFt':
        modalValues[name] = checked;
        break;
      case 'searchPt':
        modalValues[name] = checked;
        break;
      case 'searchTemp':
        modalValues[name] = checked;
        break;
      default:
        modalValues[name] = value;
        break;
    }
    return state.merge(Map({ modalValues }));
    // const { name, value } = action.event.target;
    // let modalValues = { ...state.get('modalValues') };
    // modalValues[name] = value;
    // return state.merge(Map({ modalValues }));
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
      searchPt: action.data.userInfo.search_pt,
      searchFt: action.data.userInfo.search_ft,
      searchTemp: action.data.userInfo.search_temp,
      getNotified: action.data.userInfo.get_notified,
      userInfo: action.data.userInfo
    }));
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
