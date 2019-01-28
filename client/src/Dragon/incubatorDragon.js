import React from 'react';
import dragonModels from '../gameModels/dragons';

const incubatorDragon = (props) => {
  let gameModel = dragonModels.filter(model => {
    return model.name === props.dragon.gameModel;
  })[0];

  let className = 'dragon egg';

  const onHatch = () => {
    props.setRootState({
      hatchDragon: props.dragon,
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
