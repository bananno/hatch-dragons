import React, { Component } from 'react';
import ParkHabitat from '../Habitat/ParkHabitat';

class Island extends Component {
  onClick = () => {
    if (this.props.rootState.buyHabitat != null) {
      this.buyHabitat();
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

  render () {
    let habitats = this.props.rootState.habitats.filter(habitat => {
      return habitat.island === this.props.island._id;
    });

    let className = 'island';

    if (this.props.rootState.buyHabitat != null) {
      className += ' pointer';
    }

    return (
      <div className={className} onClick={this.onClick}>
        <div>
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
