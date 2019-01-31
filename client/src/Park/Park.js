import React, { Component } from 'react';
import Island from './Island';
import ParkIncubator from './parkIncubator';

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
            this.props.rootState.islands.map(island => {
              return (
                <Island key={island._id} island={island}
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
