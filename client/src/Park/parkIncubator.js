import React from 'react';
import findModel from '../gameModels/findModel';

const parkIncubator = (props) => {
  let currentlyPlacingDragon = props.rootState.placeDragon != null;

  const handleClick = () => {
    if (currentlyPlacingDragon) {
      return;
    }

    props.setRootState({
      showIncubator: true
    });
  };

  let dragonEggs = props.rootState.dragons.filter(dragon => {
    return dragon.level === 0;
  });

  return (
    <div className="incubator park" onClick={handleClick}>
      <h1>Incubator</h1>

      {dragonEggs.map((dragon, i) => {
        let gameModel = findModel('dragon', dragon);

        return (<img src={gameModel.images[0]} alt="" key={i}/>);
      })}
    </div>
  );
};

export default parkIncubator;
