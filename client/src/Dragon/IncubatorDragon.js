import React, { Component } from 'react';
import findModel from '../gameModels/findModel';

class IncubatorDragon extends Component {
  state = {}

  gameModel = findModel('dragon', this.props.dragon);

  onHatch = () => {
    this.props.setRootState({
      placeDragon: this.props.dragon,
      showIncubator: false
    });
  }

  render() {
    let className = 'dragon egg';

    let now = new Date().getTime();

    let secondsElapsed = Math.round((now - this.props.dragon.timestamp)/1000);

    let secondsNeeded = this.gameModel.eggTime[2] + this.gameModel.eggTime[1] * 60
      + this.gameModel.eggTime[0] * 60 * 60;

    let hatching = secondsElapsed >= secondsNeeded;

    return (
      <div className={className}>
        <h1>{this.gameModel.name} Dragon</h1>
        <img src={this.gameModel.images[0]} alt=""/><br/>
        {
          hatching
          ? <button onClick={this.onHatch}>hatch</button>
          : 'waiting... (' + (secondsNeeded - secondsElapsed) + ' seconds remaining)'
        }
      </div>
    );
  }
}

export default IncubatorDragon;
