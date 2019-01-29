import React, { Component } from 'react';
import Modal from '../containers/modal';
import findModel from '../gameModels/findModel';

class ActiveDragon extends Component {
  onClose = () => {
    this.props.setRootState({
      activeHabitat: null,
      activeDragon: null
    });
  }

  onBack = () => {
    this.props.setRootState({
      activeDragon: null
    });
  }

  sell = () => {
    this.props.makePostRequest('/sellDragon', {
      dragonId: this.props.rootState.activeDragon._id
    }, {
      activeDragon: null
    });
  }

  move = () => {
    this.props.setRootState({
      placeDragon: this.props.rootState.activeDragon,
      activeHabitat: null,
      activeDragon: null
    });
  }

  render () {
    let dragon = this.props.rootState.activeDragon;

    if (dragon == null) {
      return null;
    }

    let className = 'dragon active';

    let gameModel = findModel('dragon', dragon);

    let imageSrc = gameModel.images[1];

    let backText = findModel('habitat', this.props.rootState.activeHabitat).name + ' Habitat';

    return (
      <Modal onClose={this.onClose} onBack={this.onBack} backText={backText}>
        <div className={className}>
          <img src={imageSrc} alt="" className="main-image"/>
          <div className="column">
            <h1 className="main-title">{gameModel.name} Dragon</h1>
            <br/>
            <button onClick={this.sell}>sell</button>
            <button onClick={this.move}>move</button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ActiveDragon;
