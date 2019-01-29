import React, { Component } from 'react';
import findModel from '../gameModels/findModel';

class IncubatorDragon extends Component {
  state = {}

  gameModel = findModel('dragon', this.props.dragon);

  componentDidMount() {
    let then = this.props.dragon.timestamp;
    let now = new Date().getTime();
    let secondsElapsed = Math.round((now - this.props.dragon.timestamp)/1000);
    let secondsNeeded = this.gameModel.eggTime[2] + this.gameModel.eggTime[1] * 60
      + this.gameModel.eggTime[0] * 60 * 60;
    let isHatching = secondsElapsed >= secondsNeeded;
    let secondsRemaining = secondsNeeded - secondsElapsed;

    this.setState({
      isHatching: isHatching,
      secondsNeeded: secondsNeeded,
      secondsRemaining: secondsRemaining,
    });
  }

  onHatch = () => {
    this.props.setRootState({
      placeDragon: this.props.dragon,
      showIncubator: false
    });
  }

  render() {
    return (
      <div className="dragon egg">
        <h1>{this.gameModel.name} Dragon</h1>
        <img src={this.gameModel.images[0]} alt=""/><br/>
        {
          this.state.isHatching
          ? <button onClick={this.onHatch}>hatch</button>
          : 'waiting... (' + (this.state.secondsRemaining) + ' seconds remaining)'
        }
      </div>
    );
  }
}

export default IncubatorDragon;
