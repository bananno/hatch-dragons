import React from 'react';

const marketItem = (props) => {
  return (
    <div className="market-item">
      <h4>{props.name}</h4>
      <div className="image-frame">
        <img src={props.imageSrc} alt=""/>
      </div>
      <button onClick={props.onPurchase} disabled={props.disabled}>buy</button>
    </div>
  );
};

export default marketItem;
