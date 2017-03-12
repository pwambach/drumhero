const inititalState = 0;

// action type
export const SET_START_TIME = 'SET_START_TIME';

// action creator
export function setStartTime(time) {
  return {
    type: SET_START_TIME,
    time
  };
}

// reducer
export function reducer(state = inititalState, action) {
  switch (action.type) {
    case SET_START_TIME:
      return action.time;

    default:
      return state;
  }
}
