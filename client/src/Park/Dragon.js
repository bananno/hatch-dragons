import React, { Component } from 'react';
import dragonModels from '../gameModels/dragons';

class Dragon extends Component {
  hatch = () => {
    this.props.setRootState({
      hatchDragon: this.props.dragon
    });
  }

  render () {
    let dragon = this.props.dragon;

    let gameModel = dragonModels.filter(model => {
      return model.name === dragon.gameModel;
    })[0];

    return (
      <div className="dragon">
        <h3>{this.props.dragon.gameModel} Dragon</h3>

        <img src={gameModel.images[dragon.level]} alt=""/>

        {
          this.props.incubator
          ? <button onClick={this.hatch}>hatch</button>
          : null
        }
      </div>
    );
  }
}

export default Dragon;
