const inititalState = {
  kick: [],
  snare: [],
  hihat: [],
  tom1: [],
  tom2: [],
  tom3: [],
  cymbal1: []
}

// action type
export const ADD_PLAYED_NOTE = 'ADD_PLAYED_NOTE';
export const CLEAR_PLAYED_NOTES = 'CLEAR_PLAYED_NOTES';

// action creator
export function addPlayedNote(noteType, contextTime) {
  return (dispatch, getState) => {
    const state = getState();
    const time = contextTime - state.startTime;
    dispatch({
      type: ADD_PLAYED_NOTE,
      noteType,
      time
    });
  };
}

export function clearPlayedNotes() {
  return {
    type: CLEAR_PLAYED_NOTES
  };
};

// reducer
export function reducer(state = inititalState, action) {
  switch (action.type) {
    case ADD_PLAYED_NOTE:
      const noteType = action.noteType;
      const notes = state[noteType];

      if (Array.isArray(notes)) {
        const newNotes = [...state[noteType], action.time];
        const newState = {...state, ...{[noteType]: newNotes}};
        return newState;
      }

      return state;

    case CLEAR_PLAYED_NOTES:
      return inititalState;

    default:
      return state;
  }
}
