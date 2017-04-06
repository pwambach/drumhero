import React from 'react';
import {connect} from 'react-redux';

import '../styles/main.styl';
import {startTimeSelector} from '../store/start-time';
import {currentTimeSelector} from '../store/current-time';
import {playedNotesSelector} from '../store/played-notes';
import {sheetNotesSelector} from '../store/sheet-notes';
import NoteLine from './note-line.jsx';
import ProgressBar from './progress-bar.jsx';
import getHits from '../libs/get-hits';
import isPlaying from '../libs/is-playing';
import getScore from '../libs/get-score';

class App extends React.Component {
  render() {
    const {
      startTime,
      currentTime,
      playedNotes,
      sheetNotes,
      onPlay,
      onStop
    } = this.props;
    const hits = getHits(playedNotes, sheetNotes);
    const isDebug = document.location.search.match(/debug/);
    const playing = isPlaying(startTime);
    const score = getScore(sheetNotes, hits, currentTime);
    const hueOffset = 260;

    return (
      <div className="app">
        <h1>Hello</h1>

        <div className="note-lines">
          {Object.keys(sheetNotes).map((noteType, index) => (
            <NoteLine
              key={noteType}
              notes={sheetNotes[noteType]}
              hitCount={hits[noteType].length}
              playedNotesCount={playedNotes[noteType].length}
              currentTime={currentTime}
              colorHue={hueOffset + index * 10}
              backgroundColor="#fff"
            />
          ))}
        </div>

        {!playing &&
          <button className="play-button" onClick={() => onPlay()}>
            Play
          </button>}
        {playing &&
          <button className="play-button" onClick={() => onStop()}>
            Stop
          </button>}

        <ProgressBar
          total={100}
          value={score}
          backgroundColor="#eee"
          foregroundColor="rgb(102, 25, 255)"
        />

        <br />

        <ProgressBar
          total={30}
          value={currentTime}
          backgroundColor="#eee"
          foregroundColor="#999"
        />

        {isDebug &&
          <div>
            Played Notes:
            {Object.keys(playedNotes).map(noteType => (
              <span key={noteType}>
                {noteType}: {playedNotes[noteType].length} -&nbsp;
              </span>
            ))}
          </div>}

        {isDebug &&
          <div>
            Hits:
            {Object.keys(hits).map(noteType => (
              <span key={noteType}>
                {noteType}: {hits[noteType].length} -&nbsp;
              </span>
            ))}
          </div>}

      </div>
    );
  }
}

function mapStoreToProps(state) {
  return {
    currentTime: currentTimeSelector(state),
    startTime: startTimeSelector(state),
    sheetNotes: sheetNotesSelector(state),
    playedNotes: playedNotesSelector(state)
  };
}

export default connect(mapStoreToProps)(App);
