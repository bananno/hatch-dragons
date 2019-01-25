import React, { Component } from 'react';
import Form from './Form.js';

class Login extends Component {
  state = {};

  showError = (errorMessage) => {
    this.setState({
      errorMessage: errorMessage
    });
  }

  loginUser = (user) => {
    this.props.setRootState({
      currentUser: user
    });
  }

  render () {
    if (this.props.rootState.currentUser) {
      return null;
    }

    let list1 = ['username', 'password'];
    let list2 = ['username', 'password', 'passwordConf'];
    return (
      <div>
        <Form title="Login" fields={list1} showError={this.showError} loginUser={this.loginUser}/>
        <Form title="Signup" fields={list2} showError={this.showError} loginUser={this.loginUser}/>
        <p style={{border:"1px solid black"}}>
          <b>ERROR:</b><br/>
          {this.state.errorMessage || '(none)'}
        </p>
      </div>
    );
  }
}

export default Login;
