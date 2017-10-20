import api from 'api/EmployerPage';

export const EMP_DELETE_APPL = 'EMP_DELETE_APPL';

export const EMP_GET_APPL_LIST_START = 'EMP_GET_APPL_LIST_START';
export const EMP_GET_APPL_LIST_ERROR = 'EMP_GET_APPL_LIST_ERROR';
export const EMP_GET_APPL_LIST_SUCCESS = 'EMP_GET_APPL_LIST_SUCCESS';

export function empDeleteAppl(applicationId) {
  return {
    type: EMP_DELETE_APPL,
    applicationId
  };
}

function empGetApplListStart() {
  return {
    type: EMP_GET_APPL_LIST_START,
  };
}

function empGetApplListSuccess(data) {
  return {
    type: EMP_GET_APPL_LIST_SUCCESS,
    data
  };
}

function empGetApplListError(error) {
  return {
    type: EMP_GET_APPL_LIST_ERROR,
    error
  };
}

export function empGetApplList(vacancyId) {
  return function (dispatch) {
    dispatch(empGetApplListStart());

    api.empGetApplList(vacancyId)
      .then(data => dispatch(empGetApplListSuccess(data)))
      .catch(error => dispatch(empGetApplListError(error)));
  };
}
