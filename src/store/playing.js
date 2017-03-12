import {clearPlayedNotes} from './played-notes';

const inititalState = false;

// action type
export const SET_PLAYING = 'SET_PLAYING';

// action creator
export function setPlaying(playing = false) {
  return (dispatch, getState) => {
    if (!getState().mediaLoaded) {
      return;
    }

    dispatch(clearPlayedNotes());
    dispatch({
      type: SET_PLAYING,
      playing
    });
  }
}

// reducer
export function reducer(state = inititalState, action) {
  switch (action.type) {
    case SET_PLAYING:
      return action.playing;

    default:
      return state;
  }
}
