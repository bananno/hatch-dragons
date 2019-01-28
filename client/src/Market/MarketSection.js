import React, { Component } from 'react';

const resultsPerPage = 4;

class MarketSection extends Component {
  state = {
    pageNumber: 0
  }

  render () {
    let startIndex = this.state.pageNumber;
    let modelsOnPage = this.props.models.slice(startIndex, startIndex + resultsPerPage);
    let showBackButton = startIndex > 0;
    let showNextButton = startIndex + resultsPerPage < this.props.models.length;

    return (
      <div className="market-section">
        {
          showBackButton ? <button>BACK</button> : null
        }
        {
          modelsOnPage.map((model, i) => {
            return (
              <div key={i} className="market-item">
                <h4>{model.name}</h4>
                <button onClick={this.props.onPurchase(i)}>buy</button>
              </div>
            );
          })
        }
        {
          showNextButton ? <button>NEXT</button> : null
        }
      </div>
    );
  }
}

export default MarketSection;
