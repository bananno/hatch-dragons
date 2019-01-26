import React, { Component } from 'react';
import Incubator from './Incubator';
import Habitat from './Habitat';

class Park extends Component {
  render () {
    if (this.props.rootState.currentUser == null) {
      return null;
    }

    return (
      <div>
        <Incubator rootState={this.props.rootState} setRootState={this.props.setRootState}/>
        <div>
          <h2>Habitats</h2>
          {
            this.props.rootState.habitats.map((habitat, i) => {
              return (
                <Habitat key={i} habitat={habitat} rootState={this.props.rootState}
                  setRootState={this.props.setRootState}/>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Park;
