import React from 'react';

export default (
  {
    value = 40,
    total = 100,
    foregroundColor = '#000',
    backgroundColor = '#999'
  }
) => {
  const innerWidth = Math.min(Math.round(value / total * 100), 100);
  const styleOuter = {
    backgroundColor
  };
  const styleInner = {
    width: `${innerWidth}%`,
    backgroundColor: foregroundColor
  };

  return (
    <div className="progress-bar" style={styleOuter}>
      <div className="progress-bar__inner" style={styleInner} />
    </div>
  );
};
