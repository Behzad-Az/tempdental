import { Map } from 'immutable';

import { NAV_TOGGLE_BURGER } from 'actions/Global/Navbar';

const initialState = Map({
  showBurgerMenu: false
});

const actionsMap = {
  [NAV_TOGGLE_BURGER]: (state, action) => {
    const showBurgerMenu = action.forceOff ? false : !state.get('showBurgerMenu');
    return state.merge(Map({ showBurgerMenu }));
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
