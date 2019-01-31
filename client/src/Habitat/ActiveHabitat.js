import React, { Component } from 'react';
import Modal from '../containers/modal';
import HabitatDragon from '../Dragon/HabitatDragon';
import calculateTime from '../tools/calculateTime';

class Habitat extends Component {
  state = {
    incomeCap: 0,
    money: 0
  }

  componentDidMount() {
    this.setState({
      baseMoney: this.props.rootState.activeHabitat.money,
      money: this.props.rootState.activeHabitat.money,
      incomeCap: this.props.habitat.gameModel.incomeCap,
    });

    this.calculateMoney();
    this.interval = setInterval(this.calculateMoney, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  calculateMoney = () => {
    let lastUpdate = this.props.rootState.activeHabitat.timestamp;
    let minutesElapsed = calculateTime(lastUpdate).minutesElapsedExact;
    let addition = Math.floor(this.props.incomePerMinute * minutesElapsed);
    let totalMoney = this.state.baseMoney + addition;
    if (totalMoney > this.state.incomeCap) {
      totalMoney = this.state.incomeCap;
    }
    this.setState({
      money: totalMoney
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
        <b>Income:</b> {this.props.incomePerMinute} per minute<br/>
        <b>Current money:</b> {money}<br/>
        <button onClick={this.collectMoney} disabled={disabled}>collect</button>
      </p>
    );
  }

  render () {
    return (
      <Modal onClose={this.onClose}>
        <div className="habitat active">
          <img src={this.props.habitat.gameModel.image} className="main-image" alt=""/>
          <div className="column">
            <h1 className="main-title">{this.props.habitat.gameModel.name} Habitat</h1>
            {
              !this.props.habitat.complete
              ? <p>UNDER CONSTRUCTION</p>
              : null
            }
            {this.getMoneyInfo()}
            {
              this.props.dragons.length === 0
              ? <button onClick={this.sell}>sell</button>
              : null
            }
          </div>
          <h2>Dragons</h2>
          <div>
            {this.props.dragons.map(dragon => {
              return (
                <HabitatDragon key={dragon._id} dragon={dragon}
                  setRootState={this.props.setRootState}
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
