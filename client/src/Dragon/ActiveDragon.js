import React, { Component } from 'react';
import Modal from '../containers/modal';
import dragonModels from '../gameModels/dragons';

class ActiveDragon extends Component {
  close = () => {
    this.props.setRootState({
      activeHabitat: null
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
      <Modal>
        <div className={className}>
          <h1>{gameModel.name}</h1>
          <button onClick={this.close}>CLOSE</button>
          <br/>
          <img src={imageSrc} alt=""/>
          <button onClick={this.sell}>sell</button>
        </div>
      </Modal>
    );
  }
}

export default ActiveDragon;
