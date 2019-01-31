import React from 'react';
import findModel from '../gameModels/findModel';

const habitatDragon = (props) => {
  const onClick = () => {
    props.setRootState({
      activeDragon: props.dragon
    });
  };

  let gameModel = findModel('dragon', props.dragon);
  let className = 'dragon habitat';
  let title = gameModel.name + ' Dragon';
  let imageSrc = gameModel.images[props.dragon.level];

  return (
    <div className={className} onClick={onClick}>
      <h3>{title}</h3>
      <img src={imageSrc} alt={title}/>
    </div>
  );
};

export default habitatDragon;
