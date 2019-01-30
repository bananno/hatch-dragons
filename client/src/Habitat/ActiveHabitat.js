import React, { Component } from 'react';
import Modal from '../containers/modal';
import HabitatDragon from '../Dragon/HabitatDragon';
import findModel from '../gameModels/findModel';

class Habitat extends Component {
  state = {}

  componentDidMount() {
    this.setState({
      money: this.props.rootState.activeHabitat.money
    });
  }

  componentWillUnmount() {
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
        <b>Current money:</b> {money}<br/>
        <button onClick={this.collectMoney} disabled={disabled}>collect</button>
      </p>
    );
  }

  render () {
    let habitat = this.props.rootState.activeHabitat;
    let dragon = this.props.rootState.activeDragon;

    if (habitat == null || dragon != null) {
      return null;
    }

    let className = 'habitat active';

    let gameModel = findModel('habitat', habitat);

    let dragons = this.props.rootState.dragons.filter(dragon => {
      return dragon.habitat === habitat._id;
    });

    let incomePerMinute = 0;

    dragons.forEach(dragon => {
      incomePerMinute += findModel('dragon', dragon).income[dragon.level];
    });

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
            <p>
              <b>Income:</b> {incomePerMinute} per minute
            </p>
            {
              dragons.length === 0
              ? <button onClick={this.sell}>sell</button>
              : null
            }
          </div>
          <h2>Dragons</h2>
          <div>
            {dragons.map((dragon, i) => {
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
