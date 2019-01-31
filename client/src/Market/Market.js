import React, { Component } from 'react';
import Modal from '../containers/modal';
import MarketSection from './MarketSection';
import MarketItem from './marketItem';
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

  buyIncubator = () => {
    this.props.setRootState({
      buyIncubator: true,
      showMarket: false
    });
  }

  buyHabitat = (index) => {
    return () => {
      this.props.setRootState({
        buyHabitat: index,
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
            <div onClick={this.getView('habitats')} className="market-view">
              <img src="https://vignette.wikia.nocookie.net/dragonvale/images/1/16/HabitatsIconNew.png"
                alt="habitats"/>
            </div>
            <div onClick={this.getView('dragons')} className="market-view">
              <img src="https://vignette.wikia.nocookie.net/dragonvale/images/a/af/DragonsIconNew.png"
                alt="dragons"/>
            </div>
            <br/>
            <div onClick={this.getView('buildings')} className="market-view">
              <img src="https://vignette.wikia.nocookie.net/dragonvale/images/3/3b/BuildingsIconNew.png"
                alt="buildings"/>
            </div>
            <div onClick={this.getView('islands')} className="market-view">
              <img src="https://vignette.wikia.nocookie.net/dragonvale/images/e/e5/IslandsIconNew.png"
                alt="islands"/>
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
              <div className="market-section">
                <h3>Islands</h3>
                <MarketItem name="Island #1"
                  imageSrc="https://vignette.wikia.nocookie.net/dragonvale/images/4/4f/StandardIslandThemeWithPortal.png"
                  price={0}
                  disabled={this.props.rootState.islands.length > 0}
                  onPurchase={this.buyIsland}/>
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
          {
            this.state.view === 'buildings'
            ? (
              <div>
                <h3>Buildings</h3>
                <MarketItem name="Incubator"
                  imageSrc="https://vignette.wikia.nocookie.net/dragonvale/images/5/5e/Nursery1NestNew.png"
                  price={0}
                  disabled={this.props.rootState.currentUser.incubator.size > 0}
                  onPurchase={this.buyIncubator}/>
              </div>
            ) : null
          }
        </div>
      </Modal>
    );
  }
}

export default Market;
