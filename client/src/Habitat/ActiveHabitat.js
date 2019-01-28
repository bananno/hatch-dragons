import React, { Component } from 'react';
import Modal from '../containers/modal';
import HabitatDragon from '../Dragon/HabitatDragon';
import habitatModels from '../gameModels/habitats';

class Habitat extends Component {
  close = () => {
    this.props.setRootState({
      activeHabitat: null
    });
  }

  sell = () => {
    this.props.makePostRequest('/sellHabitat', {
      habitatId: this.props.rootState.activeHabitat._id
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

    let dragons = this.props.rootState.dragons.filter(dragon => {
      return dragon.habitat === habitat._id;
    });


    return (
      <Modal>
        <div className={className}>
          <h1>{gameModel.name}</h1>
          <button onClick={this.close}>CLOSE</button>
          <br/>
          <img src={gameModel.image} className="habitat-image" alt=""/>
          {dragons.map((dragon, i) => {
            return (
              <HabitatDragon key={i} dragon={dragon} setRootState={this.props.setRootState}
                makePostRequest={this.props.makePostRequest}
                rootState={this.props.rootState}/>
            );
          })}
          {
            dragons.length === 0
            ? <button onClick={this.sell}>sell</button>
            : null
          }
        </div>
      </Modal>
    );
  }
}

export default Habitat;
