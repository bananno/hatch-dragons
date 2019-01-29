import React, { Component } from 'react';
import MiniDragon from '../Dragon/MiniDragon';
import Timer from '../containers/timer';
import findModel from '../gameModels/findModel';
import calculateTime from '../tools/calculateTime';

class ParkHabitat extends Component {
  state = {}

  habitat = this.props.habitat

  gameModel = findModel('habitat', this.habitat)

  componentDidMount() {
    if (this.props.habitat.complete) {
      this.setState({
        readyToComplete: false,
        waitingToComplete: false,
        secondsRemaining: 0
      });
    } else {
      this.makeTimer();
      this.interval = setInterval(this.makeTimer, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  makeTimer = () => {
    let times = calculateTime(this.habitat.timestamp, this.gameModel.buildTime);

    this.setState({
      readyToComplete: times.timeIsDone,
      waitingToComplete: !times.timeIsDone,
      secondsRemaining: times.secondsRemaining
    });

    if (times.timeIsDone) {
      clearInterval(this.interval);
    }
  }

  handleClick = () => {
    if (this.props.rootState.placeDragon) {
      this.placeDragon();
    } else if (this.props.habitat.complete || this.state.secondsRemaining > 0) {
      this.props.setRootState({
        activeHabitat: this.props.habitat
      });
    } else {
      this.completeConstruction();
    }
  }

  isEligibleForPlacingDragon = () => {
    if (!this.props.habitat.complete) {
      return false;
    }

    let dragon = this.props.rootState.placeDragon;

    if (dragon == null) {
      return false;
    }

    let dragonModel = findModel('dragon', dragon);

    let elementOverlap = (() => {
      for (let i in this.gameModel.elements) {
        for (let j in dragonModel.elements) {
          if (this.gameModel.elements[i] === dragonModel.elements[j]) {
            return true;
          }
        }
      }
      return false;
    })();

    return elementOverlap;
  }

  completeConstruction = () => {
    this.props.makePostRequest('/completeHabitat', {
      habitat: this.habitat._id
    });
    this.setState({
      readyToComplete: false
    });
  }

  placeDragon = () => {
    if (!this.isEligibleForPlacingDragon()) {
      return;
    }

    this.props.makePostRequest('/placeDragon', {
      dragon: this.props.rootState.placeDragon._id,
      habitat: this.habitat._id
    }, {
      placeDragon: null
    });
  }

  getConstructionDisplay = () => {
    if (this.props.habitat.complete) {
      return null;
    }

    if (this.state.secondsRemaining > 0) {
      return (
        <Timer time={this.state.secondsRemaining}/>
      );
    }

    return (
      <button>COMPLETE</button>
    );
  }

  render () {
    let dragons = this.props.rootState.dragons.filter(dragon => {
      return dragon.habitat === this.habitat._id;
    });

    let className = 'habitat park';

    if (this.isEligibleForPlacingDragon()) {
      className += ' eligible';
    }

    let style = {
      backgroundImage: 'url("' + this.gameModel.image + '")'
    };

    return (
      <div className={className} onClick={this.handleClick} style={style}>
        {this.getConstructionDisplay()}
        {dragons.map((dragon, i) => {
          return (
            <MiniDragon key={i} dragon={dragon}/>
          );
        })}
      </div>
    );
  }
}

export default ParkHabitat;
