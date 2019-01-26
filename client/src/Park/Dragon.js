import React, { Component } from 'react';
import dragonModels from '../gameModels/dragons';

class Dragon extends Component {
  render () {
    let dragon = this.props.dragon;

    let gameModel = dragonModels.filter(model => {
      return model.name === dragon.gameModel;
    })[0];

    return (
      <div>
        <h3>{this.props.dragon.gameModel} Dragon</h3>

        <img src={gameModel.images[1]} alt=""/>
      </div>
    );
  }
}

export default Dragon;
