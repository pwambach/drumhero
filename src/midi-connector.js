import {addPlayedNote} from './store/played-notes';

const VELOCITY_THRESHOLD = 10;

export default function connectMidi(store, audioContext, samplePlayer) {
  const play = function(noteType) {
    samplePlayer.play(noteType);
    store.dispatch(addPlayedNote(noteType, audioContext.currentTime));
  };

  const onMidiMessage = function(event) {
    if (event.data.length < 3) {
      return;
    }

    const note = event.data[1];
    const velocity = event.data[2];

    if (velocity === 64 || velocity < VELOCITY_THRESHOLD) {
      return;
    }

    console.log(note, velocity)

    switch(note) {
      case 36:
        play('kick');
        break;
      case 42:
        play('hihat');
        break;
      case 38:
        play('snare');
        break;
      case 48:
        play('tom1');
        break;
      case 45:
        play('tom2');
        break;
      case 43:
        play('tom3');
        break;
      case 51:
        play('cymbal1');
        break;
      default:
        break;
    }
  }

  getMidiInput().then(
    input => input.onmidimessage = onMidiMessage.bind(play),
    error => console.log(error)
  );
}

function getMidiInput() {
  if (navigator.requestMIDIAccess) {
    return navigator.requestMIDIAccess().then(
      midiInterface => getInput(midiInterface),
      error => console.log(error)
    );
  } else {
    throw new Error("Web MIDI API not supported!");
  }
}

function getInput(midiInterface) {
  const inputs = [];
  const iterator = midiInterface.inputs.values();
  for (var i = iterator.next(); i && !i.done; i = iterator.next()) {
    inputs.push(i.value);
  }

  console.log("Midi Input: ", inputs[0]);
  return inputs[0];
}
