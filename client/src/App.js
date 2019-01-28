import React, { Component } from 'react';
import Login from './Login/Login.js';
import Store from './Store/Store.js';
import Park from './Park/Park.js';

class App extends Component {
  state = {
    currentUser: null,
    habitats: [],
    dragons: [],
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

  render() {
    return (
      <div className="App">
        <h1>HatchDragons</h1>
        <p>
          <b>Current user: </b>
          {this.state.currentUser ? this.state.currentUser.username : '[none]'}
        </p>

        {
          this.state.currentUser
          ? (<form onSubmit={this.clickLogout}>
              <button type="submit">logout</button>
            </form>)
          : null
        }

        <Login rootState={this.state} visitDatabase={this.visitDatabase}/>
        <Store rootState={this.state} setRootState={this.setRootState}
          makePostRequest={this.makePostRequest}/>
        <Park rootState={this.state} setRootState={this.setRootState}/>
      </div>
    );
  }
}

export default App;
