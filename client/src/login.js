import React, { Component } from 'react';

class Login extends Component {
  state = {
    responseToPost: '',
    loginForm: {
      loginUsername: '',
      loginPassword: ''
    },
    signupForm: {
      username: '',
      password: '',
      passwordConf: '',
    }
  };

  handleSubmitLogin = async e => {
    e.preventDefault();
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.loginForm),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  handleSubmitSignup = async e => {
    e.preventDefault();
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.signupForm),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  getHandleInputChange = (formName, fieldName) => {
    return (e) => {
      let newState = this.state;
      newState[formName][fieldName] = e.target.value;
      this.setState(newState);
    };
  }

  render () {
    return (
      <div>
        <div>
          <h2>Login</h2>
          <form onSubmit={this.handleSubmitLogin}>
              <input
                type="text" name="loginUsername" placeholder="username"
                value={this.state.loginForm.loginUsername} required=""
                onChange={this.getHandleInputChange('loginForm', 'loginUsername')}/>
              <input
                type="password" name="loginPassword" placeholder="password"
                value={this.state.loginForm.loginPassword} required=""
                onChange={this.getHandleInputChange('loginForm', 'loginPassword')}/>
              <button type="submit">LOGIN</button>
          </form>
        </div>
        <div>
          <h2>Signup</h2>
          <form onSubmit={this.handleSubmitSignup}>
              <input
                type="text" name="username" placeholder="username"
                value={this.state.signupForm.username} required=""
                onChange={this.getHandleInputChange('signupForm', 'username')}/>
              <input
                type="password" name="password" placeholder="password"
                value={this.state.signupForm.password} required=""
                onChange={this.getHandleInputChange('signupForm', 'password')}/>
              <input
                type="password" name="passwordConf" placeholder="confirm password"
                value={this.state.signupForm.passwordConf} required=""
                onChange={this.getHandleInputChange('signupForm', 'passwordConf')}/>
              <button type="submit">REGISTER</button>
          </form>
        </div>
        <p style={{border:"1px solid black"}}>
          <b>RESPONSE:</b><br/>
          {this.state.responseToPost}
        </p>
      </div>
    );
  }
}

export default Login;
