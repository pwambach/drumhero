export default class MediaPlayer {
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
    this.audio.currentTime = 0;
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
