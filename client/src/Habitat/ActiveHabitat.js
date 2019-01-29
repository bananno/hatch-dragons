import React, { Component } from 'react';
import Modal from '../containers/modal';
import HabitatDragon from '../Dragon/HabitatDragon';
import habitatModels from '../gameModels/habitats';

class Habitat extends Component {
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

  render () {
    let habitat = this.props.rootState.activeHabitat;
    let dragon = this.props.rootState.activeDragon;

    if (habitat == null || dragon != null) {
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
      <Modal onClose={this.onClose}>
        <div className={className}>
          <img src={gameModel.image} className="main-image" alt=""/>
          <div className="column">
            <h1 className="main-title">{gameModel.name} Habitat</h1>
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
          {
            !habitat.complete
            ? <p>UNDER CONSTRUCTION</p>
            : null
          }
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
