import React, { Component } from 'react';
import Form from './Form.js';

class Login extends Component {
  state = {};

  showError = (errorMessage) => {
    this.setState({
      errorMessage: errorMessage
    });
  }

  loginUser = () => {
    this.props.visitDatabase();
  }

  render () {
    if (this.props.rootState.currentUser) {
      return null;
    }

    return (
      <div className="login-box">
        <Form title="Login" showError={this.showError} loginUser={this.loginUser}/>
        <Form title="Signup" showError={this.showError} loginUser={this.loginUser}/>
        <p className="error">
          {this.state.errorMessage}
        </p>
      </div>
    );
  }
}

export default Login;
