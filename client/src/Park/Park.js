import React, { Component } from 'react';
import ParkIncubator from './parkIncubator';
import ParkHabitat from '../Habitat/ParkHabitat';

class Park extends Component {
  render () {
    if (this.props.rootState.currentUser == null) {
      return null;
    }

    return (
      <div>
        <ParkIncubator rootState={this.props.rootState} setRootState={this.props.setRootState}/>
        <div>
          {
            this.props.rootState.habitats.map(habitat => {
              return (
                <ParkHabitat key={habitat._id} habitat={habitat}
                  rootState={this.props.rootState}
                  setRootState={this.props.setRootState}
                  makePostRequest={this.props.makePostRequest}/>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Park;
