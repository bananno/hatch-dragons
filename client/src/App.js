import React, { Component } from 'react';
import Login from './Login.js';

class App extends Component {
  state = {
    currentUser: null,
    post: '',
    responseToPost: '',
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

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
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

  render() {
    return (
      <div className="App">
        <h1>HatchDragons</h1>
        <p>
          <b>Current user: </b>
          {this.state.currentUser ? this.state.currentUser.username : '[none]'}
        </p>

        <form onSubmit={this.clickLogout}>
          <button type="submit">logout</button>
        </form>

        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>

        {
          this.state.currentUser
          ? null
          : <Login state={this.state} setState={this.setState}/>
        }
      </div>
    );
  }
}

export default App;
