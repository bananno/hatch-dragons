import React, { Component } from 'react';

class Park extends Component {
  render () {
    if (this.props.rootState.currentUser == null) {
      return null;
    }

    return (
      <div>
        <div style={{border:"1px solid black"}}>
          incubator
        </div>
        <div style={{border:"1px solid black"}}>
          habitats
        </div>
      </div>
    );
  }
}

export default Park;
