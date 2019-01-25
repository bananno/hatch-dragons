import React, { Component } from 'react';

class Login extends Component {
  state = {
    post: '',
    loginPostResponse: '',
  };

  handleSubmitLogin = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ loginPostResponse: body });
  };

  handleSubmitSignup = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ loginPostResponse: body });
  };

  render () {
    return (
      <div>
        <div>
          <h2>Login</h2>
          <form onSubmit={this.handleSubmitLogin}>
              <input type="text" name="loginUsername" placeholder="username" required=""/>
              <input type="password" name="loginPassword" placeholder="password" required=""/>
              <button type="submit">LOGIN</button>
          </form>
        </div>
        <div>
          <h2>Signup</h2>
          <form onSubmit={this.handleSubmitSignup}>
              <input type="text" name="username" placeholder="username" required=""/>
              <input type="password" name="password" placeholder="password" required=""/>
              <input type="password" name="passwordConf" placeholder="confirm password" required=""/>
              <button type="submit">REGISTER</button>
          </form>
        </div>
        <p style={{border:"1px solid black"}}>{'(' + this.state.loginPostResponse + ')'}</p>
      </div>
    );
  }
}

export default Login;
