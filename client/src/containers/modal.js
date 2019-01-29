import React from 'react';

const modal = (props) => {
  return (
    <div className="modal">
      <div className="popup">
        {
            props.onClose
            ? <button onClick={props.onClose}>CLOSE</button>
            : null
        }
        {
            props.onBack
            ? <button onClick={props.onBack}>BACK</button>
            : null
        }
        <br/>
        {props.children}
      </div>
    </div>
  );
};

export default modal;
