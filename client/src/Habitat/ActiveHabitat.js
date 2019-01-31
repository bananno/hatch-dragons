import React, { Component } from 'react';
import Modal from '../containers/modal';
import HabitatDragon from '../Dragon/HabitatDragon';

class Habitat extends Component {
  onClose = () => {
    this.props.setRootState({
      activeHabitat: null
    });
  }

  sell = () => {
    this.props.makePostRequest('/sellHabitat', {
      habitatId: this.props.habitat._id
    }, {
      activeHabitat: null
    });
  }

  collectMoney = () => {
    this.props.makePostRequest('/collectHabitat', {
      habitatId: this.props.habitat._id
    });
  }

  getMoneyInfo = () => {
    let money = Math.floor(this.props.currentMoney);
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
