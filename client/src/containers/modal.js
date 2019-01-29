import React from 'react';

const modal = (props) => {
  return (
    <div className="modal">
      <div className="modal-sub-frame">
        <div className="close-button">
          {
              props.onClose
              ? <div onClick={props.onClose}>X</div>
              : null
          }
        </div>
        <div className="popup">
          {
              props.onBack
              ? <button onClick={props.onBack}>BACK</button>
              : null
          }
          <br/>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default modal;
