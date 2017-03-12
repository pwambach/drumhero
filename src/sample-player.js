import getBuffer from './libs/get-buffer';

const SAMPLES = {
  snare: `${process.env.PUBLIC_URL}/samples/Ludwig-Snare-A.wav`,
  kick: `${process.env.PUBLIC_URL}/samples/Slingerland-Kit-Kick-A.wav`,
  hihat: `${process.env.PUBLIC_URL}/samples/Slingerland-Kit-SabianHHX-HiHat-Closed-A.wav`,
  tom1: `${process.env.PUBLIC_URL}/samples/Slingerland-Kit-RackTom-A.wav`,
  tom2: `${process.env.PUBLIC_URL}/samples/Slingerland-Kit-RackTom-B.wav`,
  tom3: `${process.env.PUBLIC_URL}/samples/Slingerland-Kit-FloorTom-A.wav`,
  cymbal1: `${process.env.PUBLIC_URL}/samples/Slingerland-Kit-Sabian-Ride-A.wav`
};

export default class SamplePlayer {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.source = this.audioContext.createBufferSource(this.audio);
    this.source.connect(this.audioContext.destination);

    this.buffers =this.loadBuffers()
      .then(buffers => this.buffers = buffers)
      .catch(error => console.error(error));
  }

  loadBuffers() {
    const promises = Object.keys(SAMPLES).map(
      noteType => getBuffer(SAMPLES[noteType], this.audioContext)
    );
    return Promise
      .all(promises)
      .then(buffers => {
        return buffers.reduce((total, buffer, index) => {
          const key = Object.keys(SAMPLES)[index];
          total[key] = buffer;
          return total;
        }, {})
      })
  }

  play(noteType) {
    if (!this.buffers && !this.buffers[noteType]) {
      return;
    }

    const source = this.audioContext.createBufferSource();
    source.buffer = this.buffers[noteType];
    source.connect(this.audioContext.destination);
    source.start(0);
  }
}
