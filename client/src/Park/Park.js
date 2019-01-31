import React, { Component } from 'react';
import Island from './Island';

class Park extends Component {
  render () {
    return (
      <div className="main-park">
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
    );
  }
}

export default Park;
