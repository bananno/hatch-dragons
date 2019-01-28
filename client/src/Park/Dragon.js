import React, { Component } from 'react';
import dragonModels from '../gameModels/dragons';

class Dragon extends Component {
  hatch = () => {
    this.props.setRootState({
      hatchDragon: this.props.dragon
    });
  }

  handleClick = () => {
    this.props.setRootState({
      activeDragon: this.props.dragon._id
    });
  }

  render () {
    let dragon = this.props.dragon;

    let gameModel = dragonModels.filter(model => {
      return model.name === dragon.gameModel;
    })[0];

    let className = 'dragon';

    if (this.props.rootState.activeDragon === dragon._id) {
      className += ' active';
    }

    return (
      <div className={className} onClick={this.props.incubator ? null : this.handleClick}>
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
