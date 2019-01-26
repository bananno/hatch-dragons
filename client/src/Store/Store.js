import React, { Component } from 'react';
import habitatModels from '../gameModels/habitats';
import dragonModels from '../gameModels/dragons';

class Store extends Component {
  render () {
    if (this.props.rootState.currentUser == null) {
      return null;
    }

    return (
      <div style={{border: "3px solid black"}}>
        <h2>STORE</h2>
        <div style={{border: "1px solid black"}}>
          <h3>Habitats</h3>
          {
            habitatModels.map((model, i) => {
              return (
                <div key={i}>
                  {model.name} Habitat
                </div>
              );
            })
          }
        </div>
        <div style={{border: "1px solid black"}}>
          <h3>Dragons</h3>
          {
            dragonModels.map((model, i) => {
              return (
                <div key={i}>
                  {model.name} Dragon
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Store;
