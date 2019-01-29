import React from 'react';

const modal = (props) => {
  return (
    <div className="modal">
      <div className="modal-sub-frame">
        <div className="close-button-frame">
          {
              props.onClose
              ? <div className="close-button" onClick={props.onClose}> </div>
              : null
          }
        </div>
        <div className="popup">
          {
              props.onBack
              ? <div className="back-button" onClick={props.onBack}> </div>
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
