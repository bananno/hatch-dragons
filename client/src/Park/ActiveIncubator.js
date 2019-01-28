import React, { Component } from 'react';
import Modal from '../containers/modal';
import Dragon from '../Dragon/HabitatDragon';

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

    let dragons = this.props.rootState.dragons.filter(dragon => {
      return dragon.level === 0;
    });

    return (
      <Modal onClose={this.onClose}>
        <div className="incubator active">
          <h2>Incubator</h2>

          {dragons.map((dragon, i) => {
            return (
              <Dragon key={i} dragon={dragon} incubator={true}
                rootState={this.props.rootState}
                makePostRequest={this.props.makePostRequest}
                setRootState={this.props.setRootState}/>
            );
          })}
        </div>
      </Modal>
    );
  }
}

export default ParkIncubator;
