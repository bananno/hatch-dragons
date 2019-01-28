import React, { Component } from 'react';
import Modal from '../containers/modal';
import MarketSection from './MarketSection';
import habitatModels from '../gameModels/habitats';
import dragonModels from '../gameModels/dragons';

class Market extends Component {
  buyHabitat = (index) => {
    return () => {
      this.props.makePostRequest('/buyHabitat', {
        habitatIndex: index
      }, {
        showMarket: false
      });
    };
  }

  buyDragon = (index) => {
    return () => {
      this.props.makePostRequest('/buyDragon', {
        dragonIndex: index
      }, {
        showMarket: false
      });
    };
  }

  onClose = () => {
    this.props.setRootState({
      showMarket: false
    });
  }

  render () {
    if (this.props.rootState.currentUser == null) {
      return null;
    }

    if (!this.props.rootState.showMarket) {
      return null;
    }

    return (
      <Modal onClose={this.onClose}>
        <div className="market">
          <h2>MARKET</h2>
          <h3>Habitats</h3>
          <MarketSection models={habitatModels} onPurchase={this.buyHabitat}/>
          <h3>Dragons</h3>
          <MarketSection models={dragonModels} onPurchase={this.buyDragon}/>

          <br/>
          <br/>

          <div className="market-section">
            {
              habitatModels.map((model, i) => {
                return (
                  <div key={i} className="market-item">
                    <h4>{model.name} Habitat</h4>
                    <button onClick={this.buyHabitat(i)}>buy</button>
                  </div>
                );
              })
            }
          </div>
          <h3>Dragons</h3>
          <div className="market-section">
            {
              dragonModels.map((model, i) => {
                return (
                  <div key={i} className="market-item">
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

export default Market;
