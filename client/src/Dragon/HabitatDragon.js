import React, { Component } from 'react';
import dragonModels from '../gameModels/dragons';

class Dragon extends Component {
  handleClick = () => {
    this.props.setRootState({
      activeDragon: this.props.dragon
    });
  }

  render () {
    let dragon = this.props.dragon;

    let gameModel = dragonModels.filter(model => {
      return model.name === dragon.gameModel;
    })[0];

    let className = 'dragon habitat';

    return (
      <div className={className} onClick={this.handleClick}>
        <h3>{this.props.dragon.gameModel} Dragon</h3>
        <img src={gameModel.images[dragon.level]} alt=""/>
      </div>
    );
  }
}

export default Dragon;
