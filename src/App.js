import React, { Component } from 'react';
import './App.css';

import {connect} from 'react-redux';
import {setMediaSrc} from './store/media-src';
import {setPlaying} from './store/playing';
import {setCurrentTime} from './store/currentTime';
import NoteLine from './NoteLine';

import getHits, {getEmptyHits} from './libs/get-hits';
import getScore from './libs/get-score';

import {HIT_THRESHOLD} from './constants/constants';

class App extends Component {
  render() {
    const {
      currentTime,
      mediaLoaded,
      playing,
      setMediaSrc,
      setPlaying,
      sheet,
      playedNotes
    } = this.props;
    const hits = playing ?
      getHits(playedNotes, sheet, HIT_THRESHOLD) :
      getEmptyHits(sheet);
    const score = getScore(sheet, hits, currentTime);
    const backgroundColor = 'hsl(284, 55%, 16%)';

    return (
      <div className="app"
        style={{backgroundColor}}>

        <div className='controls'>
          <button
            onClick={() => setMediaSrc(process.env.PUBLIC_URL + '/test.mp3')}
            onTouchStart={() => setMediaSrc(process.env.PUBLIC_URL + '/test.mp3')}>
            Load
          </button>
          <button onClick={() => setPlaying(true)}>Play</button>
          <button onClick={() => setPlaying(false)}>Stop</button>

          <div>{mediaLoaded ? 'loaded' : 'not loaded'} |
            {playing ? 'playing' : 'stop'} | {currentTime.toFixed(1)}</div>

          <div>Hits:
            {Object.keys(hits).map(noteType =>
              <div key={noteType}>{noteType}: {hits[noteType].length}</div>
            )}
          </div>

          <br />

          <div>Played Notes:
            {Object.keys(playedNotes).map(noteType =>
              <div key={noteType}>{noteType}: {playedNotes[noteType].length}</div>
            )}
          </div>
        </div>

        <div className='score'>{score}%</div>

        <div className='note-lines'>
          {Object.keys(sheet).map((noteType, index) => <NoteLine
            key={noteType}
            notes={sheet[noteType]}
            hitCount={hits[noteType].length}
            playedNotesCount={playedNotes[noteType].length}
            currentTime={currentTime}
            colorHue={260 + index * 10}
            backgroundColor={backgroundColor}/>
          )}
        </div>
      </div>
    );
  }
}

function mapStoreToProps(state) {
  return {
    currentTime: state.currentTime,
    mediaLoaded: state.mediaLoaded,
    playing: state.playing,
    sheet: state.sheet,
    playedNotes: state.playedNotes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setMediaSrc: url => dispatch(setMediaSrc(url)),
    setPlaying: value => dispatch(setPlaying(value)),
    setCurrentTime: time => dispatch(setCurrentTime(time))
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(App);
