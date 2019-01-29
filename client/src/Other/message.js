import React from 'react';

const message = (props) => {
  const onCancelHatchDragon = () => {
    props.setRootState({
      hatchDragon: null
    });
  }

  if (props.rootState.hatchDragon) {
    return (
      <div className="message">
        Select a habitat for the dragon.
        <button onClick={onCancelHatchDragon}>cancel</button>
      </div>
    );
  }

  return null;
};

export default message;
