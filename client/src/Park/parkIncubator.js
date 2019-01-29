import React from 'react';
import dragonModels from '../gameModels/dragons';

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
      <h2>Incubator</h2>

      {dragonEggs.map((dragon, i) => {
        let gameModel = dragonModels.filter(model => {
          return model.name === dragon.gameModel;
        })[0];

        return (<img src={gameModel.images[0]} alt="" key={i}/>);
      })}
    </div>
  );
};

export default parkIncubator;
