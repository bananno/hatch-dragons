import React, { Component } from 'react';
import Dragon from '../Dragon/HabitatDragon';

class Incubator extends Component {
  render () {
    let dragons = this.props.rootState.dragons.filter(dragon => {
      return dragon.level === 0;
    });

    return (
      <div style={{border:"1px solid black"}}>
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
    );
  }
}

export default Incubator;
