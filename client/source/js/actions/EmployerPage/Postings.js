import api from 'api/EmployerPage';

export const EMP_DELETE_POSTING = 'EMP_DELETE_POSTING';
export const EMP_DECREMENT_POSTING_APPL_COUNT = 'EMP_DECREMENT_POSTING_APPL_COUNT';

export const EMP_GET_POSTINGS_START = 'EMP_GET_POSTINGS_START';
export const EMP_GET_POSTINGS_ERROR = 'EMP_GET_POSTINGS_ERROR';
export const EMP_GET_POSTINGS_SUCCESS = 'EMP_GET_POSTINGS_SUCCESS';

export function empDeletePosting(vacancyId) {
  return {
    type: EMP_DELETE_POSTING,
    vacancyId
  };
}

export function empDecrementApplCount(applId) {
  return {
    type: EMP_DECREMENT_POSTING_APPL_COUNT,
    applId
  };
}

function empGetPostingsStart() {
  return {
    type: EMP_GET_POSTINGS_START,
  };
}

function empGetPostingsSuccess(data) {
  return {
    type: EMP_GET_POSTINGS_SUCCESS,
    data
  };
}

function empGetPostingsError(error) {
  return {
    type: EMP_GET_POSTINGS_ERROR,
    error
  };
}

export function empGetPostings() {
  return function (dispatch) {
    dispatch(empGetPostingsStart());

    api.empGetPostings()
      .then(data => dispatch(empGetPostingsSuccess(data)))
      .catch(error => dispatch(empGetPostingsError(error)));
  };
}
