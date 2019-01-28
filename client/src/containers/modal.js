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
        {props.children}
      </div>
    </div>
  );
};

export default modal;
