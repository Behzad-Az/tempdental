export const HANDLE_INPUT_CHNG = 'HANDLE_INPUT_CHNG';

export function applHandleChng(event) {
  return {
    type: HANDLE_INPUT_CHNG,
    event
  };
}
