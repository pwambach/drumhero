import {startTimeSelector} from './start-time';

const inititalState = {
  kick: [],
  snare: [],
  hihat: [],
  tom1: [],
  tom2: [],
  tom3: [],
  cymbal1: []
};

// action type
export const ADD_PLAYED_NOTE = 'ADD_PLAYED_NOTE';
export const CLEAR_PLAYED_NOTES = 'CLEAR_PLAYED_NOTES';

// action creator
export function addPlayedNote({time, note}) {
  return (dispatch, getState) => {
    const startTime = startTimeSelector(getState());

    // add note only when music is playing
    if (!startTime) {
      return;
    }

    const relativeTime = time - startTime;
    dispatch({
      type: ADD_PLAYED_NOTE,
      note,
      time: relativeTime
    });
  };
}

export function clearPlayedNotes() {
  return {
    type: CLEAR_PLAYED_NOTES
  };
}

// reducer
export function reducer(state = inititalState, action) {
  switch (action.type) {
    case ADD_PLAYED_NOTE:
      const {note, time} = action;
      const notes = state[note];
      const newNotes = [...notes, time];
      return {...state, ...{[note]: newNotes}};

    case CLEAR_PLAYED_NOTES:
      return inititalState;

    default:
      return state;
  }
}

// selector
export function playedNotesSelector(state) {
  return state.playedNotes;
}
