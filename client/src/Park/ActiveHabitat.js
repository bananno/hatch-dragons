import React, { Component } from 'react';
import Modal from '../containers/modal';

class Habitat extends Component {
  render () {
    if (this.props.rootState.activeHabitat == null) {
      return null;
    }

    return (
      <Modal>
        HABITAT
      </Modal>
    );
  }
}

export default Habitat;
