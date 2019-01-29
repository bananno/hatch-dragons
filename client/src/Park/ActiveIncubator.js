import React, { Component } from 'react';
import Modal from '../containers/modal';
import IncubatorDragon from '../Dragon/incubatorDragon';

class ParkIncubator extends Component {
  onClose = () => {
    this.props.setRootState({
      showIncubator: false
    });
  }

  render () {
    if (this.props.rootState.showIncubator === false) {
      return null;
    }

    let dragonEggs = this.props.rootState.dragons.filter(dragon => {
      return dragon.level === 0;
    });

    return (
      <Modal onClose={this.onClose}>
        <div className="incubator active">
          <h2>Incubator</h2>
          {dragonEggs.map((dragon, i) => {
            return (
              <IncubatorDragon key={i} dragon={dragon} setRootState={this.props.setRootState}/>
            );
          })}
        </div>
      </Modal>
    );
  }
}

export default ParkIncubator;