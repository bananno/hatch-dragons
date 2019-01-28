import React, { Component } from 'react';
import Dragon from './Dragon';
import habitatModels from '../gameModels/habitats';

class Habitat extends Component {
  sell = () => {
    this.props.makePostRequest('/sellHabitat', {
      habitatId: this.props.habitat._id
    });
  }

  handleClick = () => {
    if (this.props.rootState.hatchDragon) {
      this.hatchDragon();
    } else {
      this.props.setRootState({
        activeHabitat: this.props.habitat._id
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

    let isActive = this.props.rootState.activeHabitat === habitat._id;

    let className = 'park-habitat';

    if (isActive) {
      className += ' active';
    }

    return (
      <div className={className} onClick={this.handleClick}>
        <h3>{habitat.gameModel} Habitat</h3>

        <img src={gameModel.image} className="habitat-image" alt=""/>

        {dragons.map((dragon, i) => {
          return (
            <Dragon key={i} dragon={dragon} setRootState={this.props.setRootState}
              makePostRequest={this.props.makePostRequest}
              rootState={this.props.rootState}/>
          );
        })}

        {
          isActive
          ? <button onClick={this.sell}>sell</button>
          : null
        }
      </div>
    );
  }
}

export default Habitat;
