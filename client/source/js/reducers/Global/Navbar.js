import { Map } from 'immutable';

import { NAV_CHANGE_VIEW } from 'actions/Global/Navbar';

const initialState = Map({
  showBurgerMenu: false,
  currentView: null
});

const actionsMap = {
  [NAV_CHANGE_VIEW]: (state, action) => {
    const showBurgerMenu = action.args.forceOff ? false : !state.get('showBurgerMenu');
    const currentView = action.args.currentView || state.get('currentView');
    return state.merge(Map({ showBurgerMenu, currentView }));
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
