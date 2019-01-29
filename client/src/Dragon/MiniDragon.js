import React from 'react';
import findModel from '../gameModels/findModel';

const miniDragon = (props) => {
  let dragon = props.dragon;

  let gameModel = findModel('dragon', dragon);

  return (
    <div className="dragon mini">
      <img src={gameModel.images[dragon.level]} alt=""/>
    </div>
  );
};

export default miniDragon;
