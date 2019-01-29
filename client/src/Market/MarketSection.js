import React, { Component } from 'react';
import MarketItem from './marketItem';

const resultsPerPage = 4;

class MarketSection extends Component {
  state = {
    pageNumber: 0
  }

  onBackPage = () => {
    this.setState({
      pageNumber: this.state.pageNumber - resultsPerPage
    });
  }

  onNextPage = () => {
    this.setState({
      pageNumber: this.state.pageNumber + resultsPerPage
    });
  }

  render () {
    let startIndex = this.state.pageNumber;
    let modelsOnPage = this.props.models.slice(startIndex, startIndex + resultsPerPage);
    let showBackButton = startIndex > 0;
    let showNextButton = startIndex + resultsPerPage < this.props.models.length;

    return (
      <div className="market-section">
        {
          showBackButton ? <button onClick={this.onBackPage}>BACK</button> : null
        }
        {
          modelsOnPage.map((model, i) => {
            let index = i + this.state.pageNumber;
            return (
              <MarketItem key={i} model={model} onPurchase={this.props.onPurchase(index)}/>
            );
          })
        }
        {
          showNextButton ? <button onClick={this.onNextPage}>NEXT</button> : null
        }
      </div>
    );
  }
}

export default MarketSection;
