import React, { Component } from 'react';
import Header from './Other/header.js';
import Message from './Other/message.js';
import Login from './Login/Login.js';
import Market from './Market/Market.js';
import Park from './Park/Park.js';
import ActiveHabitat from './Habitat/ActiveHabitat.js';
import ActiveDragon from './Dragon/ActiveDragon.js';
import ActiveIncubator from './Park/ActiveIncubator.js';

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
    this.callApi()
      .then(res => this.setState({
        currentUser: res.user,
        islands: res.islands,
        habitats: res.habitats,
        dragons: res.dragons,
      }))
      .catch(err => console.log(err));
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

  render() {
    return (
      <div className="App">
        <Header rootState={this.state}
          setRootState={this.setRootState}
          makePostRequest={this.makePostRequest}/>
        <Message rootState={this.state}
          setRootState={this.setRootState}/>
        <Login rootState={this.state}
          visitDatabase={this.visitDatabase}/>
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
        {
          this.state.activeHabitat
          ? <ActiveHabitat rootState={this.state}
              setRootState={this.setRootState}
              makePostRequest={this.makePostRequest}/>
          : null
        }
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
