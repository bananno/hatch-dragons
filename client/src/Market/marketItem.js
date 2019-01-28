import React from 'react';

const marketItem = (props) => {
  let imageSrc = props.model.image || props.model.images[1];

  return (
    <div className="market-item">
      <h4>{props.model.name}</h4>
      <div className="image-frame">
        <img src={imageSrc} alt=""/>
      </div>
      <button onClick={props.onPurchase}>buy</button>
    </div>
  );
};

export default marketItem;
