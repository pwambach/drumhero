export default function getBuffers(url, audioContext) {
  return fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => audioContext.decodeAudioData(buffer));
}
