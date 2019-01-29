import React, { Component } from 'react';
import findModel from '../gameModels/findModel';

class IncubatorDragon extends Component {
  render() {
    let gameModel = findModel('dragon', this.props.dragon);

    let className = 'dragon egg';

    const onHatch = () => {
      this.props.setRootState({
        placeDragon: this.props.dragon,
        showIncubator: false
      });
    };

    let now = new Date().getTime();

    let secondsElapsed = Math.round((now - this.props.dragon.timestamp)/1000);

    let secondsNeeded = gameModel.eggTime[2] + gameModel.eggTime[1] * 60
      + gameModel.eggTime[0] * 60 * 60;

    let hatching = secondsElapsed >= secondsNeeded;

    return (
      <div className={className}>
        <h1>{gameModel.name} Dragon</h1>
        <img src={gameModel.images[0]} alt=""/><br/>
        {
          hatching
          ? <button onClick={onHatch}>hatch</button>
          : 'waiting... (' + (secondsNeeded - secondsElapsed) + ' seconds remaining)'
        }
      </div>
    );
  }
}

export default IncubatorDragon;
