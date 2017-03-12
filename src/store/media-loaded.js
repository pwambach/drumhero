const inititalState = false;

// action type
export const SET_MEDIA_LOADED = 'SET_MEDIA_LOADED';

// action creator
export function setMediaLoaded(loaded) {
  return {
    type: SET_MEDIA_LOADED,
    loaded
  };
}

// reducer
export function reducer(state = inititalState, action) {
  switch (action.type) {
    case SET_MEDIA_LOADED:
      return action.loaded;

    default:
      return state;
  }
}
