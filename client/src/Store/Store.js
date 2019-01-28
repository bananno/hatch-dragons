import React, { Component } from 'react';
import habitatModels from '../gameModels/habitats';
import dragonModels from '../gameModels/dragons';

class Store extends Component {
  buyHabitat = (index) => {
    return () => {
      console.log('buy habitat #' + index);
    };
  }

  buyDragon = (index) => {
    return async () => {
      await fetch('/buyDragon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dragonIndex: index
        }),
      });

      this.props.visitDatabase();
    };
  }

  hatchDragon = async () => {
    const response = await fetch('/hatchDragon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dragon: this.props.rootState.hatchDragon._id,
        habitat: this.props.habitat._id
      }),
    });

    const responseResult = await response.text();

    console.log(responseResult);
  }

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
                <div key={i} className="store-item">
                  <h4>{model.name} Habitat</h4>
                  <button onClick={this.buyHabitat(i)}>buy</button>
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
                <div key={i} className="store-item">
                  <h4>{model.name} Dragon</h4>
                  <button onClick={this.buyDragon(i)}>buy</button>
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
