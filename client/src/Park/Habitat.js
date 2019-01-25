import React, { Component } from 'react';

class Habitat extends Component {
  render () {
    let habitat = this.props.habitat;

    let dragons = this.props.rootState.dragons;

    return (
      <div className="park-habitat">
        <h3>{habitat.gameModel} Habitat</h3>
        {dragons.map((dragon, i) => {
          return (
            <div key={i}>{dragon.gameModel} Dragon</div>
          );
        })}
      </div>
    );
  }
}

export default Habitat;
