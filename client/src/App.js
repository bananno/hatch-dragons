import React, { Component } from 'react';
import Header from './Other/header.js';
import Message from './Other/message.js';
import Login from './Login/Login.js';
import Market from './Market/Market.js';
import Park from './Park/Park.js';
import ActiveDragon from './Dragon/ActiveDragon.js';
import ActiveIncubator from './Park/ActiveIncubator.js';
import findModel from './gameModels/findModel';

class App extends Component {
  state = {
    currentUser: null,
    islands: [],
    habitats: [],
    dragons: [],
    showMarket: false,
    showIncubator: false,
    placeDragon: null,
    buyHabitat: null,
    buyIncubator: false,
  }

  componentDidMount() {
    this.visitDatabase();
  }

  callApi = async () => {
    const response = await fetch('/getData');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  visitDatabase = () => {
    this.callApi().then(this.processDatabase).catch(err => console.log(err));
  }

  processDatabase = (serverResponse) => {
    let habitats = serverResponse.habitats || [];
    let dragons = serverResponse.dragons || [];

    habitats = habitats.map(habitat => {
      return this.createHabitat(habitat, dragons);
    });

    this.setState({
      currentUser: serverResponse.user,
      islands: serverResponse.islands,
      habitats: habitats,
      dragons: dragons,
    });
  }

  makePostRequest = async (path, data, stateChanges) => {
    await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (stateChanges) {
      this.setState(stateChanges);
    }

    this.visitDatabase();
  }

  setRootState = (newState) => {
    this.setState(newState);
  }

  createHabitat = (originalData, dragons) => {
    let habitat = {};

    habitat.complete = originalData.complete;
    habitat.gameModel = findModel('habitat', originalData.gameModel);
    habitat.island = originalData.island;
    habitat.money = originalData.money;
    habitat.timestamp = originalData.timestamp;
    habitat._id = originalData._id;
    habitat.dragons = dragons.filter(dragon => {
      return dragon.habitat === habitat._id;
    });

    return habitat;
  }

  render() {
    if (this.state.currentUser == null) {
      return (
        <div className="App">
          <Header rootState={this.state} setRootState={this.setRootState}/>
          <Message rootState={this.state} setRootState={this.setRootState}/>
          <Login rootState={this.state} visitDatabase={this.visitDatabase}/>
        </div>
      );
    }

    return (
      <div className="App">
        <Header rootState={this.state}
          setRootState={this.setRootState}
          makePostRequest={this.makePostRequest}/>
        <Message rootState={this.state}
          setRootState={this.setRootState}/>
        {
          this.state.showMarket
          ?  <Market rootState={this.state}
              setRootState={this.setRootState}
              makePostRequest={this.makePostRequest}
              visitDatabase={this.visitDatabase}/>
          : null
        }
        <Park rootState={this.state}
          setRootState={this.setRootState}
          makePostRequest={this.makePostRequest}/>

        <ActiveDragon rootState={this.state}
          setRootState={this.setRootState}
          makePostRequest={this.makePostRequest}/>
        <ActiveIncubator rootState={this.state}
          setRootState={this.setRootState}
          makePostRequest={this.makePostRequest}/>
      </div>
    );
  }
}

export default App;
