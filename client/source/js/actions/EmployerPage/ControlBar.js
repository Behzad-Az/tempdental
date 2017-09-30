import api from 'api/EmployerPage';

export const EMP_GET_CONTROL_DATA_START = 'EMP_GET_CONTROL_DATA_START';
export const EMP_GET_CONTROL_DATA_ERROR = 'EMP_GET_CONTROL_DATA_ERROR';
export const EMP_GET_CONTROL_DATA_SUCCESS = 'EMP_GET_CONTROL_DATA_SUCCESS';
export const EMP_FILTER_OFFICES = 'EMP_FILTER_OFFICES';
export const EMP_TOGGLE_MODAL = 'EMP_TOGGLE_MODAL';

export function addRemoveSelectedOffice(officeId) {
  return {
    type: EMP_FILTER_OFFICES,
    officeId
  };
}

export function empToggleModal(args) {
  return {
    type: EMP_TOGGLE_MODAL,
    args
  };
}

function empGetControlDataStart() {
  return {
    type: EMP_GET_CONTROL_DATA_START,
  };
}

function empGetControlDataSuccess(data) {
  return {
    type: EMP_GET_CONTROL_DATA_SUCCESS,
    data,
  };
}

function empGetControlDataError(error) {
  return {
    type: EMP_GET_CONTROL_DATA_ERROR,
    error,
  };
}

export function empGetControlData() {
  return function (dispatch) {
    dispatch(empGetControlDataStart());

    api.empGetControlData()
      .then(data => dispatch(empGetControlDataSuccess(data)))
      .catch(error => dispatch(empGetControlDataError(error)));
  };
}
