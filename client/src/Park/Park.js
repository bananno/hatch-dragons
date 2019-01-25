import React, { Component } from 'react';
import Habitat from './Habitat';

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
          {
            this.props.rootState.habitats.map((habitat, i) => {
              return (
                <Habitat key={i} habitat={habitat} rootState={this.props.rootState}/>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Park;
