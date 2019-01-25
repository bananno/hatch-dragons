import React, { Component } from 'react';

class Login extends Component {
  state = {
    loginPostResponse: '',
    formData: {
      loginUsername: '',
      loginPassword: '',
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
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ loginPostResponse: body });
  };

  handleSubmitSignup = async e => {
    e.preventDefault();
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ loginPostResponse: body });
  };

  getHandleInputChange = (fieldName) => {
    return (e) => {
      let newState = this.state;
      newState.formData[fieldName] = e.target.value;
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
                value={this.state.formData.loginUsername} required=""
                onChange={this.getHandleInputChange('loginUsername')}/>
              <input
                type="password" name="loginPassword" placeholder="password"
                value={this.state.formData.loginPassword} required=""
                onChange={this.getHandleInputChange('loginPassword')}/>
              <button type="submit">LOGIN</button>
          </form>
        </div>
        <div>
          <h2>Signup</h2>
          <form onSubmit={this.handleSubmitSignup}>
              <input
                type="text" name="username" placeholder="username"
                value={this.state.formData.username} required=""
                onChange={this.getHandleInputChange('username')}/>
              <input
                type="password" name="password" placeholder="password"
                value={this.state.formData.password} required=""
                onChange={this.getHandleInputChange('password')}/>
              <input
                type="password" name="passwordConf" placeholder="confirm password"
                value={this.state.formData.passwordConf} required=""
                onChange={this.getHandleInputChange('passwordConf')}/>
              <button type="submit">REGISTER</button>
          </form>
        </div>
        <p style={{border:"1px solid black"}}>
          <b>RESPONSE:</b><br/>
          {this.state.loginPostResponse}
        </p>
      </div>
    );
  }
}

export default Login;
