import React, { Component } from 'react';
import dragonModels from '../gameModels/dragons';

class Dragon extends Component {
  hatch = () => {
    this.props.setRootState({
      hatchDragon: this.props.dragon
    });
  }

  sell = () => {
    this.props.makePostRequest('/sellDragon', {
      dragonId: this.props.dragon._id
    });
  }

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

    let isActive = this.props.rootState.activeDragon === dragon
      && !this.props.incubator;

    let className = 'dragon habitat';

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
