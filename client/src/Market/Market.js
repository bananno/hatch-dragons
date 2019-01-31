import React, { Component } from 'react';
import Modal from '../containers/modal';
import MarketSection from './MarketSection';
import habitatModels from '../gameModels/habitats';
import dragonModels from '../gameModels/dragons';

class Market extends Component {
  state = {
    view: null
  }

  getView = (view) => {
    return () => {
      this.setState({
        view: view
      });
    };
  }

  buyIsland = () => {
    this.props.makePostRequest('/buyIsland', {
    }, {
      showMarket: false
    });
  }

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

  onBack = () => {
    this.setState({
      view: null
    });
  }

  render () {
    if (this.props.rootState.currentUser == null) {
      return null;
    }

    if (!this.props.rootState.showMarket) {
      return null;
    }

    if (this.state.view == null) {
      return (
        <Modal onClose={this.onClose}>
          <div className="market">
            <h2>MARKET</h2>
            <div>
              <div onClick={this.getView('islands')}>islands</div>
              <div onClick={this.getView('habitats')}>habitats</div>
              <div onClick={this.getView('dragons')}>dragons</div>
            </div>
          </div>
        </Modal>
      );
    }

    return (
      <Modal onClose={this.onClose} onBack={this.onBack} backText="MARKET">
        <div className="market">
          {
            this.state.view === 'islands'
            ? (
              <div>
                <h3>Islands</h3>
                <button onClick={this.buyIsland}>buy first island now (free)</button>
              </div>
            ) : null
          }
          {
            this.state.view === 'habitats'
            ? (
              <div>
                <h3>Habitats</h3>
                <MarketSection models={habitatModels} onPurchase={this.buyHabitat}/>
              </div>
            ) : null
          }
          {
            this.state.view === 'dragons'
            ? (
              <div>
                <h3>Dragons</h3>
                <MarketSection models={dragonModels} onPurchase={this.buyDragon}/>
              </div>
            ) : null
          }
        </div>
      </Modal>
    );
  }
}

export default Market;
