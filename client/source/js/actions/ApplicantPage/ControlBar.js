import api from 'api/ApplicantPage';

export const APPL_GET_CONTROL_DATA_START = 'APPL_GET_CONTROL_DATA_START';
export const APPL_GET_CONTROL_DATA_ERROR = 'APPL_GET_CONTROL_DATA_ERROR';
export const APPL_GET_CONTROL_DATA_SUCCESS = 'APPL_GET_CONTROL_DATA_SUCCESS';
export const APPL_HANDLE_CONTROL_CHNG = 'APPL_HANDLE_CONTROL_CHNG';
export const APPL_HANDLE_ADDRESS_SEARCH = 'APPL_HANDLE_ADDRESS_SEARCH';
export const APPL_TOGGLE_MODAL = 'APPL_TOGGLE_MODAL';
export const APPL_MODAL_HANDLE_CHNG = 'APPL_MODAL_HANDLE_CHNG';
export const APPL_MODAL_ADDRESS_CHNG = 'APPL_MODAL_ADDRESS_CHNG';

export function applHandleControlChng(event) {
  return {
    type: APPL_HANDLE_CONTROL_CHNG,
    event
  };
}

export function applHandleControlAddress(addressObj) {
  return {
    type: APPL_HANDLE_ADDRESS_SEARCH,
    addressObj
  };
}

export function applToggelModal(modalValues) {
  return {
    type: APPL_TOGGLE_MODAL,
    modalValues
  };
}

export function applModalHandleChng(event) {
  return {
    type: APPL_MODAL_HANDLE_CHNG,
    event
  };
}

export function applModalAddressChng(addressObj) {
  return {
    type: APPL_MODAL_ADDRESS_CHNG,
    addressObj
  };
}

function applGetControlDataStart(args) {
  return {
    type: APPL_GET_CONTROL_DATA_START,
  };
}

function applGetControlDataSuccess(data) {
  return {
    type: APPL_GET_CONTROL_DATA_SUCCESS,
    data,
  };
}

function applGetControlDataError(error) {
  return {
    type: APPL_GET_CONTROL_DATA_ERROR,
    error,
  };
}

export function applGetControlData(args) {
  return function (dispatch) {
    dispatch(applGetControlDataStart());

    api.applGetControlData(args)
      .then(data => dispatch(applGetControlDataSuccess(data)))
      .catch(error => dispatch(applGetControlDataError(error)));
  };
}

