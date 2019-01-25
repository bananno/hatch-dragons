import React, { Component } from 'react';

import habitatModels from '../gameModels/habitats';
import dragonModels from '../gameModels/dragons';

class Habitat extends Component {
  render () {
    let habitat = this.props.habitat;

    let dragons = this.props.rootState.dragons.filter(dragon => {
      return dragon.habitat === habitat._id;
    });

    let gameModel = habitatModels.filter(model => {
      return model.name === habitat.gameModel;
    })[0];

    return (
      <div className="park-habitat">
        <h3>{habitat.gameModel} Habitat</h3>

        <img src={gameModel.image} className="habitat-image" alt=""/>

        {dragons.map((dragon, i) => {
          return (
            <div key={i}>{dragon.gameModel} Dragon</div>
          );
        })}
      </div>
    );
  }
}

export default Habitat;
