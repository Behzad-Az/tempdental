export const NAV_TOGGLE_BURGER = 'NAV_TOGGLE_BURGER';

export function navToggleBurger(forceOff) {
  return {
    type: NAV_TOGGLE_BURGER,
    forceOff
  };
}