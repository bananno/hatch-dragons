import React, { Component } from 'react';
import MiniDragon from '../Dragon/MiniDragon';
import Timer from '../containers/timer';
import findModel from '../gameModels/findModel';
import calculateTime from '../tools/calculateTime';
import HabitatPopup from './popup.js';

class Habitat extends Component {
  state = {}

  habitat = this.props.habitat

  componentDidMount() {
    let dragons = this.props.rootState.dragons.filter(dragon => {
      return dragon.habitat === this.habitat._id;
    });

    let incomePerMinute = 0;

    dragons.forEach(dragon => {
      incomePerMinute += findModel('dragon', dragon).income[dragon.level];
    });

    this.setState({
      incomePerMinute: incomePerMinute,
      baseMoney: this.props.habitat.money,
      currentMoney: this.props.habitat.money,
      incomeCap: this.props.habitat.gameModel.incomeCap,
    });

    if (this.props.habitat.complete) {
      this.setState({
        secondsRemaining: 0
      });
      this.timerCalculateIncome();
      clearInterval(this.constructionTimer);
      this.incomeTimer = setInterval(this.timerCalculateIncome, 1000);
    } else {
      this.timerRemainingConstruction();
      this.constructionTimer = setInterval(this.timerRemainingConstruction, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.incomeTimer);
    clearInterval(this.constructionTimer);
  }

  timerRemainingConstruction = () => {
    let times = calculateTime(this.habitat.timestamp, this.habitat.gameModel.buildTime);

    this.setState({
      secondsRemaining: times.secondsRemaining
    });

    if (times.timeIsDone) {
      clearInterval(this.interval);
    }
  }

  timerCalculateIncome = () => {
    let lastUpdate = this.props.habitat.timestamp;
    let minutesElapsed = calculateTime(lastUpdate).minutesElapsedExact;
    let addition = Math.floor(this.state.incomePerMinute * minutesElapsed);
    let totalMoney = this.state.baseMoney + addition;
    if (totalMoney > this.state.incomeCap) {
      totalMoney = this.state.incomeCap;
    }
    let clickToCollect = totalMoney > (this.state.incomeCap/2);
    this.setState({
      currentMoney: totalMoney,
      clickToCollect: clickToCollect
    });
  }

  isWaitingToComplete = () => {
    return !this.props.habitat.complete && this.state.secondsRemaining > 0;
  }

  isReadyToComplete = () => {
    return !this.props.habitat.complete && this.state.secondsRemaining <= 0;
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

  onClick = () => {
    if (this.props.rootState.placeDragon) {
      this.onPlaceDragon();
    } else if (this.props.rootState.buyHabitat != null) {
      return;
    } else if (this.isReadyToComplete()) {
      this.onCompleteConstruction();
    } else {
      this.props.setRootState({
        activeHabitat: this.props.habitat
      });
    }
  }

  onCompleteConstruction = () => {
    this.props.makePostRequest('/completeHabitat', {
      habitat: this.habitat._id
    });
  }

  onPlaceDragon = () => {
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

  onSellHabitat = () => {
    this.props.makePostRequest('/sellHabitat', {
      habitatId: this.props.habitat._id
    }, {
      activeHabitat: null
    });
  }

  onCollectMoney = () => {
    this.props.makePostRequest('/collectHabitat', {
      habitatId: this.props.habitat._id
    });
    this.setState({
      currentMoney: 0,
      clickToCollect: false
    });
  }

  getConstructionDisplay = () => {
    if (this.isWaitingToComplete()) {
      return (
        <div className="construction-waiting">
          <span>UNDER CONSTRUCATION</span><br/>
          <Timer time={this.state.secondsRemaining}/>
        </div>
      );
    }

    if (this.isReadyToComplete()) {
      return (
        <div className="construction-ready">
          <span>READY</span><br/>
          <button>CLICK TO COMPLETE</button>
        </div>
      );
    }

    return null;
  }

  getCoinPile = () => {
    if (!this.state.clickToCollect) {
      return null;
    }
    return (
      <div className="habitat-coin-pile"> </div>
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
        <div className={className} onClick={this.onClick} style={style}>
          {this.getConstructionDisplay()}
          {dragons.map(dragon => {
            return (
              <MiniDragon key={dragon._id} dragon={dragon}/>
            );
          })}
          {this.getCoinPile()}
        </div>
        {
          showActiveWindow
          ? <HabitatPopup
              habitat={this.props.habitat}
              dragons={dragons}
              incomePerMinute={this.state.incomePerMinute}
              currentMoney={this.state.currentMoney}
              sellHabitat={this.onSellHabitat}
              collectMoney={this.onCollectMoney}
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
