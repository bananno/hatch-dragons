import React, { Component } from 'react';
import Modal from '../containers/modal';
import dragonModels from '../gameModels/dragons';

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
    });
  }

  render () {
    let dragon = this.props.rootState.activeDragon;

    if (dragon == null) {
      return null;
    }

    let className = 'dragon active';

    let gameModel = dragonModels.filter(model => {
      return model.name === dragon.gameModel;
    })[0];

    let imageSrc = gameModel.images[1];

    return (
      <Modal onClose={this.onClose} onBack={this.onBack}>
        <div className={className}>
          <img src={imageSrc} alt="" className="main-image"/>
          <h1 className="main-title">{gameModel.name} Dragon</h1>
          <br/>
          <button onClick={this.sell}>sell</button>
        </div>
      </Modal>
    );
  }
}

export default ActiveDragon;
