import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import {Provider} from 'react-redux';
import {create} from './store/index';
import {MediaPlayer, connectMediaPlayer} from './media-player';
import SamplePlayer from './sample-player';
import connectKeyboard from './keyboard-connector';
import connectMidi from './midi-connector';

const store = create();
const audioContext = new AudioContext();
const mediaPlayer = new MediaPlayer(audioContext);
const samplePlayer = new SamplePlayer(audioContext);

// connect media player with redux store
connectMediaPlayer(mediaPlayer, store);
connectKeyboard(store, audioContext, samplePlayer);
connectMidi(store, audioContext, samplePlayer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// for debugging
window.store = store;
window.player = mediaPlayer;
window.samplePlayer = samplePlayer;
