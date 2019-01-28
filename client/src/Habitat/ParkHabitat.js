import React, { Component } from 'react';
import MiniDragon from '../Dragon/MiniDragon';
import habitatModels from '../gameModels/habitats';

class ParkHabitat extends Component {
  handleClick = () => {
    if (this.props.rootState.hatchDragon) {
      this.hatchDragon();
    } else {
      this.props.setRootState({
        activeHabitat: this.props.habitat
      });
    }
  }

  hatchDragon = () => {
    this.props.makePostRequest('/hatchDragon', {
      dragon: this.props.rootState.hatchDragon._id,
      habitat: this.props.habitat._id
    });
  }

  render () {
    let habitat = this.props.habitat;

    let dragons = this.props.rootState.dragons.filter(dragon => {
      return dragon.habitat === habitat._id;
    });

    let gameModel = habitatModels.filter(model => {
      return model.name === habitat.gameModel;
    })[0];

    let className = 'habitat park';

    return (
      <div className={className} onClick={this.handleClick}>
        <h3>{habitat.gameModel} Habitat</h3>

        <img src={gameModel.image} className="habitat-image" alt=""/>

        {dragons.map((dragon, i) => {
          return (
            <MiniDragon key={i} dragon={dragon}/>
          );
        })}
      </div>
    );
  }
}

export default ParkHabitat;
