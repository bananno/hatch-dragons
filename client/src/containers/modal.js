import React from 'react';

const modal = (props) => {
  return (
    <div className="modal">
      {props.children}
    </div>
  );
};

export default modal;
