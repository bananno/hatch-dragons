import React, { Component } from 'react';

class Island extends Component {
  onClick = () => {
    if (this.props.rootState.buyHabitat != null) {
      this.buyHabitat();
    }
  }

  buyHabitat = () => {
    this.props.makePostRequest('/buyHabitat', {
      habitatIndex: this.props.rootState.buyHabitat,
      island: this.props.island._id,
    }, {
      buyHabitat: null
    });
  }

  render () {
    return (
      <div className="island" onClick={this.onClick}>
        ISLAND
      </div>
    );
  }
}

export default Island;
