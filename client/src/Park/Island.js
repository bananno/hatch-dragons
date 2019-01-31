import React, { Component } from 'react';
import ParkIncubator from './parkIncubator';
import ParkHabitat from '../Habitat/ParkHabitat';

class Island extends Component {
  onClick = () => {
    if (this.props.rootState.buyHabitat != null) {
      this.buyHabitat();
    } else if (this.props.rootState.buyIncubator) {
      this.buyIncubator();
    }
  }

  buyHabitat = () => {
    this.props.makePostRequest('/buyHabitat', {
      habitatIndex: this.props.rootState.buyHabitat,
      island: this.props.island._id,
    }, {
      buyHabitat: null
    });
  }

  buyIncubator = () => {
    this.props.makePostRequest('/buyIncubator', {
      island: this.props.island._id,
    }, {
      buyIncubator: false
    });
  }

  showIncubator = () => {
    let incubatorIsland = this.props.rootState.currentUser.incubator.island;
    if (incubatorIsland === this.props.island._id) {
      return (
        <ParkIncubator rootState={this.props.rootState} setRootState={this.props.setRootState}/>
      );
    }
  }

  render () {
    let habitats = this.props.rootState.habitats.filter(habitat => {
      return habitat.island === this.props.island._id;
    });

    let className = 'island';

    if (this.props.rootState.buyHabitat != null || this.props.rootState.buyIncubator) {
      className += ' pointer';
    }

    return (
      <div className={className} onClick={this.onClick}>
        <div>
          {this.showIncubator()}
          {
            habitats.map(habitat => {
              return (
                <ParkHabitat key={habitat._id} habitat={habitat}
                  rootState={this.props.rootState}
                  setRootState={this.props.setRootState}
                  makePostRequest={this.props.makePostRequest}/>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Island;
