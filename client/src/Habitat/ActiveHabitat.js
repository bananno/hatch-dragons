import React, { Component } from 'react';
import Modal from '../containers/modal';
import HabitatDragon from '../Dragon/HabitatDragon';
import findModel from '../gameModels/findModel';
import calculateTime from '../tools/calculateTime';

class Habitat extends Component {
  state = {
    dragons: [],
    incomePerMinute: 0,
    money: 0
  }

  componentDidMount() {
    let habitat = this.props.rootState.activeHabitat;

    let incomePerMinute = 0;

    let dragons = this.props.rootState.dragons.filter(dragon => {
      return dragon.habitat === habitat._id;
    });

    dragons.forEach(dragon => {
      incomePerMinute += findModel('dragon', dragon).income[dragon.level];
    });

    this.setState({
      dragons: dragons,
      incomePerMinute: incomePerMinute,
      baseMoney: this.props.rootState.activeHabitat.money,
      money: this.props.rootState.activeHabitat.money,
    });

    this.calculateMoney();
    this.interval = setInterval(this.calculateMoney, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  calculateMoney = () => {
    let lastUpdate = this.props.rootState.activeHabitat.timestamp;
    let minutesElapsed = calculateTime(lastUpdate).minutesElapsed;
    let addition = Math.floor(this.state.incomePerMinute * minutesElapsed);
    this.setState({
      money: this.state.baseMoney + addition
    });
  }

  onClose = () => {
    this.props.setRootState({
      activeHabitat: null
    });
  }

  sell = () => {
    this.props.makePostRequest('/sellHabitat', {
      habitatId: this.props.rootState.activeHabitat._id
    }, {
      activeHabitat: null
    });
  }

  collectMoney = () => {
    this.props.makePostRequest('/collectHabitat', {
      habitatId: this.props.rootState.activeHabitat._id
    });
  }

  getMoneyInfo = () => {
    let money = Math.floor(this.state.money);
    let disabled = money === 0;
    return (
      <p>
        <b>Income:</b> {this.state.incomePerMinute} per minute<br/>
        <b>Current money:</b> {money}<br/>
        <button onClick={this.collectMoney} disabled={disabled}>collect</button>
      </p>
    );
  }

  render () {
    let habitat = this.props.rootState.activeHabitat;
    let activeDragon = this.props.rootState.activeDragon;
    let gameModel = findModel('habitat', habitat);

    if (habitat == null || activeDragon != null) {
      return null;
    }

    let className = 'habitat active';

    return (
      <Modal onClose={this.onClose}>
        <div className={className}>
          <img src={gameModel.image} className="main-image" alt=""/>
          <div className="column">
            <h1 className="main-title">{gameModel.name} Habitat</h1>
            {
              !habitat.complete
              ? <p>UNDER CONSTRUCTION</p>
              : null
            }
            {this.getMoneyInfo()}
            {
              this.state.dragons.length === 0
              ? <button onClick={this.sell}>sell</button>
              : null
            }
          </div>
          <h2>Dragons</h2>
          <div>
            {this.state.dragons.map((dragon, i) => {
              return (
                <HabitatDragon key={i} dragon={dragon} setRootState={this.props.setRootState}
                  makePostRequest={this.props.makePostRequest}
                  rootState={this.props.rootState}/>
              );
            })}
          </div>
        </div>
      </Modal>
    );
  }
}

export default Habitat;
