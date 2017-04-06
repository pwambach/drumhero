// @flow

type Time = number;
type State = Time;
type SetAction = {type: 'SET_CURRENT_TIME', time: Time};
type Action = SetAction;

const inititalState: Time = 0;

// action type
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME';

// action creator
export function setCurrentTime(time: Time): SetAction {
  return {
    type: SET_CURRENT_TIME,
    time
  };
}

// reducer
export function reducer(state: State = inititalState, action: Action) {
  switch (action.type) {
    case SET_CURRENT_TIME:
      return action.time;

    default:
      return state;
  }
}

// selector
export function currentTimeSelector(state) {
  return state.currentTime;
}
