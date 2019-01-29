import React from 'react';

const message = (props) => {
  const onCancelPlaceDragon = () => {
    props.setRootState({
      hatchDragon: null,
      placeDragon: null,
    });
  }

  if (props.rootState.hatchDragon || props.rootState.placeDragon) {
    return (
      <div className="message">
        Select a habitat for the dragon.
        <button onClick={onCancelPlaceDragon}>cancel</button>
      </div>
    );
  }

  return null;
};

export default message;
