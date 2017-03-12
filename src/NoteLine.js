import React from 'react';
import Hit from './Hit';

import './NoteLine.css';

const LINE_HEIGHT = 500;
const LINE_WIDTH = 2;
const STROKE_WIDTH = 2;
const CIRCLE_RADIUS = 8;
const DURATION = 10.0; // in seconds

export default ({
  notes,
  hitCount,
  playedNotesCount,
  currentTime,
  colorHue = 100,
  backgroundColor = '#eee'}) => {

  const circleRadius = CIRCLE_RADIUS - (STROKE_WIDTH / 2);
  const halfWidth = circleRadius + STROKE_WIDTH;
  const totalWidth = halfWidth * 2;
  const color = `hsl(${colorHue}, 100%, 55%)`;
  const circleColor = `hsl(${colorHue}, 100%, 65%)`;
  const visibleNotes = notes
    .filter(note => note - currentTime < DURATION)
    .map(note => {
      const progress = (note - currentTime) / DURATION * LINE_HEIGHT;
      const invertedProgress = LINE_HEIGHT - progress;
      return {
        key: String(note),
        progress: invertedProgress
      };
    })
    .filter(note => note.progress <= LINE_HEIGHT);

  return <div className='note-line' style={{width: totalWidth}}>
    <svg className='note-line__line'
      width={`${totalWidth}px`}
      height={`${LINE_HEIGHT + 20}px`}>
      {/*<rect width={`${totalWidth}px`}
        height={`${LINE_HEIGHT + 20}px`}
        fill='#eee' />*/}
      <rect
        width={`${LINE_WIDTH}px`}
        height={`${LINE_HEIGHT}px`}
        x={halfWidth - LINE_WIDTH / 2}
        fill={color}/>
      {visibleNotes.map(note =>
        <circle
          key={note.key}
          style={{transform: `translateY(${note.progress}px)`}}
          cx={halfWidth}
          cy="0"
          r={circleRadius}
          stroke={circleColor}
          strokeWidth={STROKE_WIDTH}
          fill={backgroundColor}/>
      )}
    </svg>

    <Hit className='note-line__hit'
      parentHeight={LINE_HEIGHT}
      parentWidth={totalWidth}
      width
      hitCount={hitCount}
      playedNotesCount={playedNotesCount}
      color={color}/>
  </div>
}
