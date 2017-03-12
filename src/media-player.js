import {setMediaLoaded} from './store/media-loaded';
import {setCurrentTime} from './store/currentTime';
import {setStartTime} from './store/startTime';

export class MediaPlayer {
  constructor(audioContext) {
    this.audio = document.createElement('audio');
    this.audioContext = audioContext;

    this.source = this.audioContext.createMediaElementSource(this.audio);
    this.source.connect(this.audioContext.destination);
  }

  load(url) {
    return new Promise((resolve, reject) => {
      this.audio.addEventListener('canplaythrough', resolve);
      this.audio.addEventListener('error', reject);
      this.audio.src = url;
    });
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  getDuration() {
    return this.audio.duration;
  }

  getContextTime() {
    return this.audioContext.currentTime;
  }
}


export function connectMediaPlayer(player, store) {
  let oldState = store.getState();

  const checkCurrentTime = function() {
    requestAnimationFrame(checkCurrentTime);
    const state = store.getState();

    if (!state.playing) {
      return;
    }

    const startTime = state.startTime;
    const time = player.getContextTime() - startTime;
    store.dispatch(setCurrentTime(time));
  };
  checkCurrentTime();


  store.subscribe(() => {
    const newState = store.getState();
    const newSrc = newState.mediaSrc;
    const newPlaying = newState.playing;

    // load
    if (newSrc !== oldState.mediaSrc) {
      player.load(newSrc)
        .then(() => store.dispatch(setMediaLoaded(true)))
        .catch(error => console.log(error));
    }

    // play/pause
    if (newPlaying !== oldState.playing) {
      if (newPlaying) {
        player.play();
        requestAnimationFrame(() =>
          store.dispatch(setStartTime(player.getContextTime()))
        );
      } else {
        player.pause();
      }
    }

    oldState = newState;
  });
}
