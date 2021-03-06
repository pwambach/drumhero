export default function connectKeyboard(audioContext, callback) {
  const play = function(note) {
    callback({time: audioContext.currentTime, note});
  };

  document.body.addEventListener('keydown', event => {
    switch (event.keyCode) {
      case 49:
        play('kick');
        break;
      case 50:
        play('hihat');
        break;
      case 51:
        play('snare');
        break;
      case 52:
        play('tom1');
        break;
      case 53:
        play('tom2');
        break;
      case 54:
        play('tom3');
        break;
      case 55:
        play('cymbal1');
        break;
      default:
        break;
    }
  });
}
