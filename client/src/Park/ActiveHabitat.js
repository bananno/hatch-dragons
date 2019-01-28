import React, { Component } from 'react';
import Modal from '../containers/modal';
import habitatModels from '../gameModels/habitats';

class Habitat extends Component {
  close = () => {
    this.props.setRootState({
      activeHabitat: null
    });
  }

  render () {
    let habitat = this.props.rootState.activeHabitat;

    if (habitat == null) {
      return null;
    }

    let className = 'habitat active';

    let gameModel = habitatModels.filter(model => {
      return model.name === habitat.gameModel;
    })[0];

    return (
      <Modal>
        <div className={className}>
          <h1>{gameModel.name}</h1>
          <button onClick={this.close}>CLOSE</button>
          <br/>
          <img src={gameModel.image} className="habitat-image" alt=""/>
        </div>
      </Modal>
    );
  }
}

export default Habitat;
