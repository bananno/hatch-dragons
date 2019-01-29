import React from 'react';

const timer = (props) => {
  let seconds = props.time;
  let minutes = 0;
  let hours = 0;

  if (seconds >= 60) {
    minutes = Math.floor(seconds/60);
    seconds -= minutes * 60;
  }

  if (minutes >= 60) {
    hours = Math.floor(minutes/60);
    minutes -= hours * 60;
  }

  if (hours > 0) {
    hours = '' + hours + ':';
    if (minutes < 10) {
      hours += '0';
    }
  } else {
    hours = '';
  }

  let timeDisplay = hours + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

  return (
    <span className="timer">{timeDisplay}</span>
  );
};

export default timer;
