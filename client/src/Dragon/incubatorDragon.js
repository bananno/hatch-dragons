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
      <h3>{gameModel.name} Dragon</h3>

      <img src={gameModel.images[0]} alt=""/>

      <button onClick={onHatch}>hatch</button>
    </div>
  );
};

export default incubatorDragon;
