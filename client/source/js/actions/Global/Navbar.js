export const NAV_CHANGE_VIEW = 'NAV_CHANGE_VIEW';

export function navChangeView(args) {
  return {
    type: NAV_CHANGE_VIEW,
    args
  };
}
