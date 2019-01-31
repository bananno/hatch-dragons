import React, { Component } from 'react';
import MiniDragon from '../Dragon/MiniDragon';
import Timer from '../containers/timer';
import findModel from '../gameModels/findModel';
import calculateTime from '../tools/calculateTime';
import ActiveHabitat from './ActiveHabitat.js';

class Habitat extends Component {
  state = {}

  habitat = this.props.habitat

  componentDidMount() {
    if (this.props.habitat.complete) {
      this.setState({
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

  waitingToComplete = () => {
    return !this.props.habitat.complete && this.state.secondsRemaining > 0;
  }

  readyToComplete = () => {
    return !this.props.habitat.complete && this.state.secondsRemaining <= 0;
  }

  makeTimer = () => {
    let times = calculateTime(this.habitat.timestamp, this.habitat.gameModel.buildTime);

    this.setState({
      secondsRemaining: times.secondsRemaining
    });

    if (times.timeIsDone) {
      clearInterval(this.interval);
    }
  }

  handleClick = () => {
    if (this.props.rootState.placeDragon) {
      this.placeDragon();
    } else if (this.props.rootState.buyHabitat != null) {
      return;
    } else if (this.readyToComplete()) {
      this.completeConstruction();
    } else {
      this.props.setRootState({
        activeHabitat: this.props.habitat
      });
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
      for (let i in this.habitat.gameModel.elements) {
        for (let j in dragonModel.elements) {
          if (this.habitat.gameModel.elements[i] === dragonModel.elements[j]) {
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
    if (this.waitingToComplete()) {
      return (
        <div className="construction-waiting">
          <span>UNDER CONSTRUCATION</span><br/>
          <Timer time={this.state.secondsRemaining}/>
        </div>
      );
    }

    if (this.readyToComplete()) {
      return (
        <div className="construction-ready">
          <span>READY</span><br/>
          <button>CLICK TO COMPLETE</button>
        </div>
      );
    }

    return null;
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
      backgroundImage: 'url("' + this.habitat.gameModel.image + '")'
    };

    let tempSize = this.habitat.gameModel.size;

    style.backgroundSize = tempSize[0] * 100;
    style.width = tempSize[0] * 100;
    style.height = tempSize[1] * 100;

    let showActiveWindow = this.props.rootState.activeDragon == null
      && (this.props.rootState.activeHabitat || {})._id === this.props.habitat._id;

    return (
      <div className="habitat base">
        <div className={className} onClick={this.handleClick} style={style}>
          {this.getConstructionDisplay()}
          {dragons.map(dragon => {
            return (
              <MiniDragon key={dragon._id} dragon={dragon}/>
            );
          })}
        </div>
        {
          showActiveWindow
          ? <ActiveHabitat
              habitat={this.props.habitat}
              dragons={dragons}
              rootState={this.props.rootState}
              setRootState={this.props.setRootState}
              makePostRequest={this.props.makePostRequest}/>
          : null
        }
      </div>
    );
  }
}

export default Habitat;
