import React from 'react';
import findModel from '../gameModels/findModel';

const incubatorDragon = (props) => {
  let gameModel = findModel('dragon', props.dragon);

  let className = 'dragon egg';

  const onHatch = () => {
    props.setRootState({
      placeDragon: props.dragon,
      showIncubator: false
    });
  };

  return (
    <div className={className}>
      <h1>{gameModel.name} Dragon</h1>
      <img src={gameModel.images[0]} alt=""/><br/>
      <button onClick={onHatch}>hatch</button>
    </div>
  );
};

export default incubatorDragon;
