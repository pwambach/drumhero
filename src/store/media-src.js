const inititalState = null;

// action type
export const SET_MEDIA_SRC = 'SET_MEDIA_SRC';

// action creator
export function setMediaSrc(src) {
  return {
    type: SET_MEDIA_SRC,
    src
  };
}

// reducer
export function reducer(state = inititalState, action) {
  switch (action.type) {
    case SET_MEDIA_SRC:
      return action.src;

    default:
      return state;
  }
}
