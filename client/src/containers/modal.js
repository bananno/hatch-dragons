import React from 'react';

const modal = (props) => {
  return (
    <div className="modal">
      <div className="popup">
        {props.children}
      </div>
    </div>
  );
};

export default modal;
