import React from 'react';

const marketItem = (props) => {
  return (
    <div className="market-item">
      <h4>{props.model.name}</h4>
      <button onClick={props.onPurchase}>buy</button>
    </div>
  );
};

export default marketItem;
