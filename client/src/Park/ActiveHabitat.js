import React, { Component } from 'react';

class Habitat extends Component {
  render () {
    if (this.props.rootState.activeHabitat == null) {
      return null;
    }

    return (
      <div>
        HABITAT
      </div>
    );
  }
}

export default Habitat;
