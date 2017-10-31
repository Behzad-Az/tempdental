import { Map } from 'immutable';

import {
  HANDLE_INPUT_CHNG
} from 'actions/LoginPage/LoginRegister';

const initialState = Map({
  dataLoaded: false,
  pageError: false,
  loginUsername: '',
  loginPswd: '',
  modalValues: {}
});

const actionsMap = {

  [HANDLE_INPUT_CHNG]: (state, action) => {
    const { name, value, checked } = action.event.target;
    let stateObj = {};
    switch (name) {
      default:
        stateObj[name] = value;
        break;
    }
    return state.merge(Map(stateObj));
  },

};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
