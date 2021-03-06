import React from 'react';

const marketItem = (props) => {
  let buttonText = props.price > 0 ? 'buy' : 'claim';
  let disabled = props.disabled || props.userMoney < props.price;
  return (
    <div className="market-item">
      <h4>{props.name}</h4>
      <div className="image-frame">
        <img src={props.imageSrc} alt=""/>
      </div>
      {
        props.price > 0
        ? (<div className="market-price">{props.price}</div>)
        : (<div className="market-price-free">FREE</div>)
      }
      <br/>
      <button onClick={props.onPurchase} disabled={disabled}>{buttonText}</button>
    </div>
  );
};

export default marketItem;
