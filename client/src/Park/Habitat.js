import React, { Component } from 'react';
import Dragon from './Dragon';
import habitatModels from '../gameModels/habitats';

class Habitat extends Component {
  handleClick = () => {
    let hatchDragon = this.props.rootState.hatchDragon;

    if (hatchDragon) {
      console.log('hatched!');

      this.props.setRootState({
        hatchDragon: null
      });
    }
  }

  render () {
    let habitat = this.props.habitat;

    let dragons = this.props.rootState.dragons.filter(dragon => {
      return dragon.habitat === habitat._id;
    });

    let gameModel = habitatModels.filter(model => {
      return model.name === habitat.gameModel;
    })[0];

    return (
      <div className="park-habitat" onClick={this.handleClick}>
        <h3>{habitat.gameModel} Habitat</h3>

        <img src={gameModel.image} className="habitat-image" alt=""/>

        {dragons.map((dragon, i) => {
          return (
            <Dragon key={i} dragon={dragon} setRootState={this.props.setRootState}/>
          );
        })}
      </div>
    );
  }
}

export default Habitat;
