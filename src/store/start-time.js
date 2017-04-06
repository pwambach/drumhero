// @flow

type Time = number | null;
type State = Time;
type SetAction = {type: 'SET_START_TIME', time: Time};
type Action = SetAction;

const inititalState: Time = null;

// action type
export const SET_START_TIME = 'SET_START_TIME';

// action creator
export function setStartTime(time: Time): SetAction {
  return {
    type: SET_START_TIME,
    time
  };
}

// reducer
export function reducer(state: State = inititalState, action: Action) {
  switch (action.type) {
    case SET_START_TIME:
      return action.time;

    default:
      return state;
  }
}

// selector
export function startTimeSelector(state) {
  return state.startTime;
}
