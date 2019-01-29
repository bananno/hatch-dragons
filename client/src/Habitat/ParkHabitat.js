import React, { Component } from 'react';
import MiniDragon from '../Dragon/MiniDragon';
import findModel from '../gameModels/findModel';

class ParkHabitat extends Component {
  habitat = this.props.habitat

  gameModel = findModel('habitat', this.habitat)

  handleClick = () => {
    if (this.props.rootState.placeDragon) {
      this.placeDragon();
    } else {
      this.props.setRootState({
        activeHabitat: this.props.habitat
      });
    }
  }

  placeDragon = () => {
    this.props.makePostRequest('/placeDragon', {
      dragon: this.props.rootState.placeDragon._id,
      habitat: this.habitat._id
    }, {
      placeDragon: null
    });
  }

  render () {
    let dragons = this.props.rootState.dragons.filter(dragon => {
      return dragon.habitat === this.habitat._id;
    });

    let className = 'habitat park';

    let style = {
      backgroundImage: 'url("' + this.gameModel.image + '")'
    };

    return (
      <div className={className} onClick={this.handleClick} style={style}>
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
