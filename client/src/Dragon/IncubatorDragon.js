import React, { Component } from 'react';
import Timer from '../containers/timer';
import findModel from '../gameModels/findModel';
import calculateTime from '../tools/calculateTime';

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
    let times = calculateTime(this.props.dragon.timestamp, this.gameModel.eggTime);

    this.setState({
      isHatching: times.timeIsDone,
      secondsRemaining: times.secondsRemaining,
    });

    if (times.timeIsDone) {
      clearInterval(this.interval);
    }
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
          : <Timer time={this.state.secondsRemaining}/>
        }
      </div>
    );
  }
}

export default IncubatorDragon;
