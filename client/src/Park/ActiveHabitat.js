import React, { Component } from 'react';
import Modal from '../containers/modal';
import habitatModels from '../gameModels/habitats';

class Habitat extends Component {
  render () {
    let habitat = this.props.rootState.activeHabitat;

    if (habitat == null) {
      return null;
    }

    let className = 'habitat active';

    let gameModel = habitatModels.filter(model => {
      return model.name === habitat.gameModel;
    })[0];

    console.log(habitat);

    return (
      <Modal className={className}>
        <div>
          <img src={gameModel.image} className="habitat-image" alt=""/>
        </div>
      </Modal>
    );
  }
}

export default Habitat;
