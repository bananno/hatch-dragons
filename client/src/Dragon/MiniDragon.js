import React from 'react';
import dragonModels from '../gameModels/dragons';

const minDragon = (props) => {
  let dragon = props.dragon;

  let gameModel = dragonModels.filter(model => {
    return model.name === dragon.gameModel;
  })[0];

  return (
    <div class="dragon mini">
      <img src={gameModel.images[dragon.level]} alt=""/>
    </div>
  );
};

export default minDragon;
