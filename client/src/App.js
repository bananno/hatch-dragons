import React, { Component } from 'react';
import Login from './Login.js';

class App extends Component {
  state = {
    currentUser: null,
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ currentUser: res.user }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/getCurrentUser');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  clickLogout = async () => {
    await fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    this.setState({ currentUser: null });
  }

  setGlobalState = (newState) => {
    console.log('setting global state...');
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

        {
          this.state.currentUser
          ? null
          : <Login state={this.state} setState={this.setGlobalState}/>
        }
      </div>
    );
  }
}

export default App;
