import React, { Component } from 'react';
import ActiveIncubator from './ActiveIncubator';
import ParkIncubator from './ParkIncubator';
import ParkHabitat from '../Habitat/ParkHabitat';

class Park extends Component {
  state = {
    showIncubator: false
  }

  render () {
    if (this.props.rootState.currentUser == null) {
      return null;
    }

    return (
      <div>
        {
          this.state.showIncubator
          ? <ActiveIncubator rootState={this.props.rootState} setRootState={this.props.setRootState}/>
          : <ParkIncubator rootState={this.props.rootState} setRootState={this.props.setRootState}/>
        }
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
