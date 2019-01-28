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
          <h2>Habitats</h2>
          {
            this.props.rootState.habitats.map((habitat, i) => {
              return (
                <ParkHabitat key={i} habitat={habitat}
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
