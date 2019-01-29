import React from 'react';
import findModel from '../gameModels/findModel';

const IncubatorDragon = (props) => {
  let gameModel = findModel('dragon', props.dragon);

  let className = 'dragon egg';

  const onHatch = () => {
    props.setRootState({
      placeDragon: props.dragon,
      showIncubator: false
    });
  };

  let now = new Date().getTime();

  let secondsElapsed = Math.round((now - props.dragon.timestamp)/1000);

  let secondsNeeded = gameModel.eggTime[2] + gameModel.eggTime[1] * 60
    + gameModel.eggTime[0] * 60 * 60;

  let hatching = secondsElapsed >= secondsNeeded;

  return (
    <div className={className}>
      <h1>{gameModel.name} Dragon</h1>
      <img src={gameModel.images[0]} alt=""/><br/>
      {
        hatching
        ? <button onClick={onHatch}>hatch</button>
        : 'waiting... (' + (secondsNeeded - secondsElapsed) + ' seconds remaining)'
      }
    </div>
  );
};

export default IncubatorDragon;
