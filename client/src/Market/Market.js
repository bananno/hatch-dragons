import React, { Component } from 'react';
import Modal from '../containers/modal';
import habitatModels from '../gameModels/habitats';
import dragonModels from '../gameModels/dragons';

class Store extends Component {
  buyHabitat = (index) => {
    return () => {
      this.props.makePostRequest('/buyHabitat', {
        habitatIndex: index
      });
    };
  }

  buyDragon = (index) => {
    return () => {
      this.props.makePostRequest('/buyDragon', {
        dragonIndex: index
      });
    };
  }

  onClose = () => {
    this.props.setRootState({
      showStore: false
    });
  }

  render () {
    if (this.props.rootState.currentUser == null) {
      return null;
    }

    if (!this.props.rootState.showStore) {
      return null;
    }

    return (
      <Modal onClose={this.onClose}>
        <div className="store">
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
      </Modal>
    );
  }
}

export default Store;
