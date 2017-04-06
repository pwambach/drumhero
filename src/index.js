// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {create} from './store/index';
import SamplePlayer from './libs/sample-player';
import MediaPlayer from './libs/media-player';
import keyboardConnector from './libs/keyboard-connector';
import midiConnector from './libs/midi-connector';

import {addPlayedNote, clearPlayedNotes} from './store/played-notes';
import {setStartTime, startTimeSelector} from './store/start-time';
import {setCurrentTime} from './store/current-time';

import App from './components/app.jsx';

// Create AudioContext
const audioContext = (window.audioContext = new AudioContext());

// Create store
const store = create();

// Create and load sample player
const samplePlayer = new SamplePlayer(audioContext);
samplePlayer.load();

// Create and load media player
const mediaPlayer = new MediaPlayer(audioContext);
mediaPlayer.load('test.mp3');

// Connect midi device and keyboard. Play note and dispatch to store.
function handleNote({note, time}) {
  samplePlayer.play(note);
  store.dispatch(addPlayedNote({note, time}));
}
keyboardConnector(audioContext, handleNote);
midiConnector(audioContext, handleNote);

// handle play logic
function onPlay() {
  store.dispatch(clearPlayedNotes());
  mediaPlayer.play();
  store.dispatch(setStartTime(window.audioContext.currentTime));
  store.dispatch(setCurrentTime(0));
  loop();
}

function onStop() {
  mediaPlayer.pause();
  store.dispatch(setCurrentTime(0));
  store.dispatch(setStartTime(null));
}

function loop() {
  const startTime = startTimeSelector(store.getState());

  if (startTime) {
    store.dispatch(setCurrentTime(audioContext.currentTime - startTime));
    requestAnimationFrame(loop);
  }
}

// Render App
ReactDOM.render(
  <Provider store={store}>
    <App onPlay={() => onPlay()} onStop={() => onStop()} />
  </Provider>,
  document.getElementById('root')
);

// debug
window.store = store;
