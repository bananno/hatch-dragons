import React from 'react';

const message = (props) => {
  let message = null;

  if (props.rootState.hatchDragon) {
    message = 'Select a habitat for the dragon.';
  }

  if (message == null) {
    return null;
  }

  return (
    <div className="message">
      {message}
    </div>
  );
};

export default message;
