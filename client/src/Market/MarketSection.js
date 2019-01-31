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

  getScrollButton = (direction, showButton, handleClick) => {
    let className = 'market-scroll arrow-' + direction;
    if (showButton) {
      className += ' available';
    }
    return (
      <div className={className} onClick={handleClick}> </div>
    );
  }

  render () {
    let startIndex = this.state.pageNumber;
    let modelsOnPage = this.props.models.slice(startIndex, startIndex + resultsPerPage);
    let showBackButton = startIndex > 0;
    let showNextButton = startIndex + resultsPerPage < this.props.models.length;

    return (
      <div className="market-section">
        {this.getScrollButton('left', showBackButton, this.onBackPage)}
        {
          modelsOnPage.map((model, i) => {
            let index = i + this.state.pageNumber;
            return (
              <MarketItem key={i} name={model.name}
                imageSrc={model.image || model.images[1]}
                price={model.buy} userMoney={this.props.userMoney}
                disabled={false}
                onPurchase={this.props.onPurchase(index)}/>
            );
          })
        }
        {this.getScrollButton('right', showNextButton, this.onNextPage)}
      </div>
    );
  }
}

export default MarketSection;
