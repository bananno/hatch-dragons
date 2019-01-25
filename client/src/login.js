import React, { Component } from 'react';

class Login extends Component {
  render () {
    return (
      <div>
        <div>
          <h2>Login</h2>
          <form action="/login" method="post">
              <input type="text" name="loginUsername" placeholder="username" required=""/>
              <input type="password" name="loginPassword" placeholder="password" required=""/>
              <button type="submit">LOGIN</button>
          </form>
        </div>
        <div>
          <h2>Signup</h2>
          <form action="/signup" method="post">
              <input type="text" name="username" placeholder="username" required=""/>
              <input type="password" name="password" placeholder="password" required=""/>
              <input type="password" name="passwordConf" placeholder="confirm password" required=""/>
              <button type="submit">REGISTER</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
