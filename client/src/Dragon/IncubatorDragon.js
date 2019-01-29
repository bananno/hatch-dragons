import React, { Component } from 'react';
import findModel from '../gameModels/findModel';

class IncubatorDragon extends Component {
  state = {}

  gameModel = findModel('dragon', this.props.dragon);

  componentDidMount() {
    this.calculateEggTimer();
    this.interval = setInterval(this.calculateEggTimer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  calculateEggTimer = () => {
    let then = this.props.dragon.timestamp;
    let now = new Date().getTime();
    let secondsElapsed = Math.round((now - then)/1000);
    let secondsNeeded = this.gameModel.eggTime[2] + this.gameModel.eggTime[1] * 60
      + this.gameModel.eggTime[0] * 60 * 60;
    let isHatching = secondsElapsed >= secondsNeeded;
    let secondsRemaining = secondsNeeded - secondsElapsed;

    this.setState({
      isHatching: isHatching,
      secondsNeeded: secondsNeeded,
      secondsRemaining: secondsRemaining,
    });

    if (isHatching) {
      clearInterval(this.interval);
    }
  }

  onHatch = () => {
    this.props.setRootState({
      placeDragon: this.props.dragon,
      showIncubator: false
    });
  }

  getTimeDisplay = (seconds) => {
    let minutes = 0;
    let hours = 0;

    if (seconds >= 60) {
      minutes = Math.floor(seconds/60);
      seconds -= minutes * 60;
    }

    if (minutes >= 60) {
      hours = Math.floor(minutes/60);
      minutes -= hours * 60;
    }

    if (hours > 0) {
      hours = '' + hours + ':';
      if (minutes < 10) {
        hours += '0';
      }
    } else {
      hours = '';
    }

    return hours + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  render() {
    return (
      <div className="dragon egg">
        <h1>{this.gameModel.name} Dragon</h1>
        <img src={this.gameModel.images[0]} alt=""/><br/>
        {
          this.state.isHatching
          ? <button onClick={this.onHatch}>hatch</button>
          : 'waiting... (' + this.getTimeDisplay(this.state.secondsRemaining) + ' remaining)'
        }
      </div>
    );
  }
}

export default IncubatorDragon;
