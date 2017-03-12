const inititalState = 0;

// action type
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME';

// action creator
export function setCurrentTime(time) {
  return {
    type: SET_CURRENT_TIME,
    time
  };
}

// reducer
export function reducer(state = inititalState, action) {
  switch (action.type) {
    case SET_CURRENT_TIME:
      return action.time;

    default:
      return state;
  }
}
