import React from 'react';

const message = (props) => {
  const onCancelPlaceDragon = () => {
    props.setRootState({
      placeDragon: null,
    });
  }

  if (props.rootState.placeDragon) {
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
