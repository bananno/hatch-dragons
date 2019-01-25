import React, { Component } from 'react';
import Form from './Form.js';

class Login extends Component {
  state = {
    formError: ''
  };

  render () {
    let list1 = ['username', 'password'];
    let list2 = ['username', 'password', 'passwordConf'];
    return (
      <div>
        <Form title="Login" fields={list1}/>
        <Form title="Signup" fields={list2}/>
        <p style={{border:"1px solid black"}}>
          <b>ERROR:</b><br/>
          {this.state.formError || '(none)'}
        </p>
      </div>
    );
  }
}

export default Login;
