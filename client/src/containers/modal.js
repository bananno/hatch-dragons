import React from 'react';

const modal = (props) => {
  return (
    <div class="modal">
      {props.children}
    </div>
  );
};

export default modal;
