import React from 'react';
import classnames from 'classnames';

const CIRCLE_RADIUS = 10;
const SCALE_FACTOR = 8; // set also in css (scale)

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hit: false,
      played: false
    };
  }

  componentWillUpdate(nextProps) {
    if (this.props.hitCount !== nextProps.hitCount) {
      this.setState({hit: true});
      setTimeout(() => this.setState({hit: false}), 500);
    }

    if (this.props.playedNotesCount !== nextProps.playedNotesCount) {
      this.setState({played: true});
      setTimeout(() => this.setState({played: false}), 120);
    }
  }

  render() {
    const {
      parentHeight,
      parentWidth,
      key,
      color = '#000',
      className
    } = this.props;
    const {hit, played} = this.state;
    const radius = CIRCLE_RADIUS / 2;
    const totalWidth = CIRCLE_RADIUS * SCALE_FACTOR;
    const halfWidth = totalWidth / 2;
    const totalHeight = parentHeight + halfWidth;
    const innerClasses = classnames(
      'hit-inner',
      {'hit-inner--highlight': hit},
      {'hit-inner--animate': played}
    );
    const outerClasses = classnames('hit-outer', {'hit-outer--animate': hit});

    return (
      <svg
        className={className}
        key={key}
        width={totalWidth}
        height={totalHeight}
        style={{transform: `translateX(${(totalWidth - parentWidth) / -2}px)`}}>
        <circle
          className={outerClasses}
          cx={halfWidth}
          cy={parentHeight}
          r={radius}
          fill={color}
        />
        <circle
          className={innerClasses}
          cx={halfWidth}
          cy={parentHeight}
          r={radius}
          fill={color}
        />
      </svg>
    );
  }
}
