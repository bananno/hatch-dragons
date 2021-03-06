import React from 'react';

const message = (props) => {
  const onCancelPlaceDragon = () => {
    props.setRootState({
      placeDragon: null,
    });
  }

   const onCancelPurchase = () => {
    props.setRootState({
      buyHabitat: null,
      buyIncubator: false,
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

  if (props.rootState.buyHabitat != null) {
    return (
      <div className="message">
        Select an island for the habitat.
        <button onClick={onCancelPurchase}>cancel</button>
      </div>
    );
  }

  if (props.rootState.buyIncubator) {
    return (
      <div className="message">
        Select an island for the incubator.
        <button onClick={onCancelPurchase}>cancel</button>
      </div>
    );
  }

  if (props.rootState.currentUser == null) {
    return null;
  }

  if (props.rootState.currentUser.incubator.size === 0) {
    return (
      <div className="message">
        You don't have any islands! Go to the market and claim your first island for free.
      </div>
    );
  }

  return null;
};

export default message;
