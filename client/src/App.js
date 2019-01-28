import React, { Component } from 'react';
import Login from './Login/Login.js';
import Store from './Store/Store.js';
import Park from './Park/Park.js';
import ActiveHabitat from './Habitat/ActiveHabitat.js';

class App extends Component {
  state = {
    currentUser: null,
    habitats: [],
    dragons: [],
    showStore: false,
    hatchDragon: null,
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
        habitats: res.habitats,
        dragons: res.dragons,
      }))
      .catch(err => console.log(err));
  }

  makePostRequest = async (path, data) => {
    await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    this.visitDatabase();
  }

  clickLogout = () => {
    this.makePostRequest('/logout');
  }

  setRootState = (newState) => {
    this.setState(newState);
  }

  openStore = () => {
    this.setState({
      showStore: !this.state.showStore
    });
  }

  render() {
    return (
      <div className="App">
        <div className="page-header">
          <h1>Hatch Dragons</h1>
        </div>

        {
          this.state.currentUser
          ? (
            <p>
              <b>Current user: </b>
              {this.state.currentUser.username}
            </p>
          ) : null
        }

        {
          this.state.currentUser
          ? (<form onSubmit={this.clickLogout}>
              <button type="submit">logout</button>
            </form>)
          : null
        }

        {
          (this.state.currentUser && !this.state.showStore)
          ? <button onClick={this.openStore}>STORE</button>
          : null
        }

        <Login rootState={this.state} visitDatabase={this.visitDatabase}/>
        <Store rootState={this.state} makePostRequest={this.makePostRequest}
          setRootState={this.setRootState}
          visitDatabase={this.visitDatabase}/>
        <Park rootState={this.state} setRootState={this.setRootState}
          makePostRequest={this.makePostRequest}/>
        <ActiveHabitat rootState={this.state}
          setRootState={this.setRootState}
          makePostRequest={this.makePostRequest}/>
      </div>
    );
  }
}

export default App;
