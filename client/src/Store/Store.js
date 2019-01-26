import React, { Component } from 'react';

class Store extends Component {
  render () {
    if (this.props.rootState.currentUser == null) {
      return null;
    }

    return (
      <div style={{border: "1px solid black"}}>
        <h2>STORE</h2>
      </div>
    );
  }
}

export default Store;
